import "server-only";

import { performance } from "node:perf_hooks";
import pLimit from "p-limit";

import { generateStory } from "@/lib/storyEngine";
import { generateImage } from "@/lib/images";
import { buildImageFilename, enhancePromptStyle } from "@/utils/imageUtils";
import { supabase } from "@/lib/supabaseServer";
import { generateAudio } from "@/lib/geminiTTS";
import type { JourneyStep, Story } from "@/types/story";
import type { PromptStoryStep } from "@/types/promptGenerationTypes";

export type StoryExportRequest = {
  emotion: string;
  character: string;
  orientation?: "vertical" | "horizontal";
};

export type TimingEntry = { label: string; ms: number; stepId?: string };

export type StoryExportResult = {
  story: Story;
  url?: string;
  cached: boolean;
  timings: TimingEntry[];
};

export const CANCELLED_JOB_ERROR = "JOB_CANCELLED";

export type StoryExportOptions = {
  shouldCancel?: () => Promise<boolean>;
  onProgress?: (completed: number, total: number) => Promise<void>;
};

async function throwIfCancelled(options?: StoryExportOptions) {
  if (!options?.shouldCancel) return;
  const cancelled = await options.shouldCancel();
  if (cancelled) {
    throw new Error(CANCELLED_JOB_ERROR);
  }
}

async function reportProgress(
  options: StoryExportOptions | undefined,
  completed: number,
  total: number
) {
  if (!options?.onProgress) return;
  await options.onProgress(completed, total);
}

function normalizeStoryCategory(
  value: string | undefined
): Story["category"] {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (normalized === "emotions" || normalized === "emociones")
    return "emotions";
  if (normalized === "breathing" || normalized === "respiracion")
    return "breathing";
  if (normalized === "focus" || normalized === "concentracion")
    return "focus";
  if (normalized === "sleep" || normalized === "sueno") return "sleep";
  return undefined;
}

function buildRuntimeSteps(sourceSteps: PromptStoryStep[]): JourneyStep[] {
  return sourceSteps.map((step, index) => {
    if (!step.audioSrc) {
      throw new Error(`Missing audioSrc for step ${step.id || index}`);
    }
    const visuals: JourneyStep["visuals"] = {
      type: step.visuals?.type ?? "scene",
      backgroundImage: step.visuals?.backgroundImage,
      foregroundImage: step.visuals?.foregroundImage,
      breathingCueType: step.visuals?.breathingCueType,
      choices: step.visuals?.choices,
      gameComponentId: step.visuals?.gameComponentId,
    };
    const interaction: JourneyStep["interaction"] = step.interaction ?? {
      type: "auto_proceed",
      nextStepId: sourceSteps[index + 1]?.id ?? "end",
    };

    return {
      id: step.id,
      audioSrc: step.audioSrc,
      subtitle: step.subtitle,
      visuals,
      interaction,
      isNarration: step.isNarration ?? true,
    };
  });
}

async function timeAsync<T>(
  timings: TimingEntry[],
  label: string,
  fn: () => Promise<T>,
  stepId?: string
): Promise<T> {
  const start = performance.now();
  try {
    return await fn();
  } finally {
    const ms = performance.now() - start;
    timings.push({ label, ms, stepId });
  }
}

export async function generateStoryExport(
  request: StoryExportRequest,
  options?: StoryExportOptions
): Promise<StoryExportResult> {
  const { emotion, character, orientation } = request;
  const timings: TimingEntry[] = [];
  const totalStart = performance.now();

  await throwIfCancelled(options);
  const cacheKey = `generated/${character}_${emotion}.json`;
  try {
    const { data: cachedUrl } = supabase.storage
      .from("stories")
      .getPublicUrl(cacheKey);

    const cachedRes = await fetch(cachedUrl.publicUrl);
    if (cachedRes.ok) {
      const cachedStory = (await cachedRes.json()) as Story;
      console.info("[story/export] Cache hit", {
        cacheKey,
        url: cachedUrl.publicUrl,
      });
      timings.push({ label: "TOTAL", ms: performance.now() - totalStart });
      return {
        story: cachedStory,
        cached: true,
        url: cachedUrl.publicUrl,
        timings,
      };
    }
  } catch (err) {
    // Cache miss or invalid cached data; continue to regenerate.
    console.info("[story/export] Cache miss", { cacheKey });
  }

  await throwIfCancelled(options);
  const story = await timeAsync(timings, "generateStory", () =>
    generateStory(emotion, character)
  );

  story.initialStepId = story.initialStepId ?? story.steps[0]?.id ?? "scene_1";
  story.guideId = story.guideId ?? character;

  const limit = pLimit(4);
  const totalSteps = story.steps.length;
  let completedSteps = 0;

  await Promise.all(
    story.steps.map((step, i) =>
      limit(async () => {
        await throwIfCancelled(options);
        const stepId = step.id ?? `scene_${i + 1}`;
        const audioFilename = `${story.id}_${stepId}.wav`;

        const audioData = await timeAsync(
          timings,
          "generateAudio",
          () => generateAudio(step.subtitle, audioFilename),
          stepId
        );

        const audioUploadRes = await timeAsync(
          timings,
          "uploadAudio",
          () =>
            supabase.storage
              .from("stories")
              .upload(`audio/${audioFilename}`, audioData.buffer, {
                contentType: "audio/wav",
                upsert: true,
              }),
          stepId
        );

        if (audioUploadRes.error) {
          throw new Error(
            `Error al subir audio: ${audioUploadRes.error.message}`
          );
        }

        const { data: audioPublicUrl } = supabase.storage
          .from("stories")
          .getPublicUrl(`audio/${audioFilename}`);
        step.audioSrc = audioPublicUrl.publicUrl;

        if (step.prompt_img) {
          await throwIfCancelled(options);
          const styledPrompt = enhancePromptStyle(step.prompt_img);
          const imageFilename = buildImageFilename(styledPrompt, orientation);
          const legacyFilename = buildImageFilename(styledPrompt);
          const imagePath = `images/${imageFilename}`;
          const legacyPath = `images/${legacyFilename}`;
          const existingImageUrl = supabase.storage
            .from("stories")
            .getPublicUrl(imagePath).data.publicUrl;

          const existingImageRes = await fetch(existingImageUrl);
          if (existingImageRes.ok) {
            step.visuals = {
              ...step.visuals,
              backgroundImage: existingImageUrl,
            };
          } else {
            await throwIfCancelled(options);
            const legacyImageUrl = supabase.storage
              .from("stories")
              .getPublicUrl(legacyPath).data.publicUrl;
            const legacyImageRes = await fetch(legacyImageUrl);
            if (legacyImageRes.ok) {
              step.visuals = {
                ...step.visuals,
                backgroundImage: legacyImageUrl,
              };
              return;
            }

            const imageData = await timeAsync(
              timings,
              "generateImage",
              () => generateImage(styledPrompt, orientation),
              stepId
            );

            const imageUploadRes = await timeAsync(
              timings,
              "uploadImage",
              () =>
                supabase.storage
                  .from("stories")
                  .upload(`images/${imageData.filename}`, imageData.buffer, {
                    contentType: "image/jpeg",
                    upsert: true,
                  }),
              stepId
            );

            if (imageUploadRes.error) {
              throw new Error(
                `Error al subir imagen: ${imageUploadRes.error.message}`
              );
            }

            const { data: imagePublicUrl } = supabase.storage
              .from("stories")
              .getPublicUrl(`images/${imageData.filename}`);
            step.visuals = {
              ...step.visuals,
              backgroundImage: imagePublicUrl.publicUrl,
            };
          }
        }

        const nextStep = story.steps[i + 1];
        if (!step.interaction) {
          step.interaction = {
            type: "auto_proceed",
            nextStepId: nextStep?.id ?? "end",
          };
        }

        step.isNarration = true;
        completedSteps += 1;
        await reportProgress(options, completedSteps, totalSteps);
      })
    )
  );

  const filename = `${story.id}.json`;
  const uploadRes = await timeAsync(timings, "uploadStoryJSON", () =>
    supabase.storage
      .from("stories")
      .upload(filename, JSON.stringify(story, null, 2), {
        contentType: "application/json",
        upsert: true,
      })
  );

  if (uploadRes.error) {
    throw new Error(
      "Error al subir historia a Supabase: " + uploadRes.error.message
    );
  }

  const { data: publicUrlData } = supabase.storage
    .from("stories")
    .getPublicUrl(filename);

  await timeAsync(timings, "uploadStoryCache", () =>
    supabase.storage
      .from("stories")
      .upload(
        `generated/${character}_${emotion}.json`,
        JSON.stringify(story, null, 2),
        {
          contentType: "application/json",
          upsert: true,
        }
      )
  );

  timings.push({ label: "TOTAL", ms: performance.now() - totalStart });

  const { category: rawCategory, steps, ...restStory } = story;
  const normalizedCategory = normalizeStoryCategory(rawCategory);
  const runtimeSteps = buildRuntimeSteps(steps);
  const runtimeStory: Story = {
    ...restStory,
    steps: runtimeSteps,
    ...(normalizedCategory ? { category: normalizedCategory } : {}),
  };

  return {
    story: runtimeStory,
    url: publicUrlData?.publicUrl,
    cached: false,
    timings,
  };
}
