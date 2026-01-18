import "server-only";

import { performance } from "node:perf_hooks";
import pLimit from "p-limit";

import { generateStory, generateHiveImage } from "@/lib/storyEngine";
import { enhancePromptStyle } from "@/utils/imageUtils";
import { supabase } from "@/lib/supabaseServer";
import { generateAudio } from "@/lib/geminiTTS";
import type { Story } from "@/types/story";

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
  request: StoryExportRequest
): Promise<StoryExportResult> {
  const { emotion, character, orientation } = request;
  const timings: TimingEntry[] = [];
  const totalStart = performance.now();

  const cacheKey = `generated/${character}_${emotion}.json`;
  try {
    const { data: cachedUrl } = supabase.storage
      .from("stories")
      .getPublicUrl(cacheKey);

    const cachedRes = await fetch(cachedUrl.publicUrl);
    if (cachedRes.ok) {
      const cachedStory = (await cachedRes.json()) as Story;
      timings.push({ label: "TOTAL", ms: performance.now() - totalStart });
      return {
        story: cachedStory,
        cached: true,
        url: cachedUrl.publicUrl,
        timings,
      };
    }
  } catch (err) {
    console.log("[story/export] cache miss:", cacheKey, err);
  }

  const story = await timeAsync(timings, "generateStory", () =>
    generateStory(emotion, character)
  );

  story.initialStepId = story.initialStepId ?? story.steps[0]?.id ?? "scene_1";
  story.guideId = story.guideId ?? character;

  const limit = pLimit(4);

  await Promise.all(
    story.steps.map((step, i) =>
      limit(async () => {
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
          const styledPrompt = enhancePromptStyle(step.prompt_img);
          const imageData = await timeAsync(
            timings,
            "generateHiveImage",
            () => generateHiveImage(styledPrompt, orientation),
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

        const nextStep = story.steps[i + 1];
        if (!step.interaction) {
          step.interaction = {
            type: "auto_proceed",
            nextStepId: nextStep?.id ?? "end",
          };
        }

        step.isNarration = true;
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

  return {
    story,
    url: publicUrlData?.publicUrl,
    cached: false,
    timings,
  };
}
