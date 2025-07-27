import { NextResponse } from "next/server";
import { performance } from "node:perf_hooks";
import pLimit from "p-limit";

import {
  generateStory,
  generateAudio,
  generateHiveImage,
} from "@/lib/storyEngine";
import { enhancePromptStyle } from "@/utils/imageUtils";
import { supabase } from "@/lib/supabaseServer";

type TimingEntry = { label: string; ms: number; stepId?: string };
const timings: TimingEntry[] = [];

/** Helper para medir tiempos de funciones async */
async function timeAsync<T>(
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

export async function POST(request: Request) {
  const tAll = performance.now();
  const body = await request.json();
  const { emotion, character, orientation } = body;

  if (!emotion || !character) {
    return NextResponse.json(
      { error: "emotion y character son requeridos." },
      { status: 400 }
    );
  }

  try {
    // 1. Generar historia (secuencial, no se puede paralelizar)
    const story = await timeAsync("generateStory", () =>
      generateStory(emotion, character)
    );

    story.initialStepId =
      story.initialStepId ?? story.steps[0]?.id ?? "scene_1";
    story.guideId = story.guideId ?? character;

    // 2. Concurrencia controlada para audios e imágenes
    const limit = pLimit(4); // máximo 4 tareas en paralelo

    await Promise.all(
      story.steps.map((step, i) =>
        limit(async () => {
          const stepId = step.id ?? `scene_${i + 1}`;
          const audioFilename = `${story.id}_${stepId}.mp3`;

          // === AUDIO ===
          const audioData = await timeAsync(
            "generateAudio",
            () => generateAudio(step.subtitle, audioFilename),
            stepId
          );

          const audioUploadRes = await timeAsync(
            "uploadAudio",
            () =>
              supabase.storage
                .from("stories")
                .upload(`audio/${audioFilename}`, audioData.buffer, {
                  contentType: "audio/mpeg",
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

          // === IMAGE ===
          if (step.prompt_img) {
            const styledPrompt = enhancePromptStyle(step.prompt_img);
            const imageData = await timeAsync(
              "generateHiveImage",
              () => generateHiveImage(styledPrompt, orientation),
              stepId
            );

            const imageUploadRes = await timeAsync(
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

          // Interacción automática
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

    // 3. Subir historia final
    const filename = `${story.id}.json`;
    const uploadRes = await timeAsync("uploadStoryJSON", () =>
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

    // 4. Timings
    const totalMs = performance.now() - tAll;
    timings.push({ label: "TOTAL", ms: totalMs });
    console.table(timings);

    return NextResponse.json({ story, url: publicUrlData?.publicUrl, timings });
  } catch (error) {
    console.error("Error generando historia:", error);
    return NextResponse.json(
      { error: "Error generando historia", details: (error as Error).message },
      { status: 500 }
    );
  }
}
