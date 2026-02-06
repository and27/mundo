import "server-only";
import { buildImageFilename } from "@/utils/imageUtils";
import { buildStoryPrompt } from "./buildStoryPrompt";
import type {
  PromptGeneratedStory,
  StoryPromptOptions,
} from "@/types/promptGenerationTypes";
import { performance } from "node:perf_hooks";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function timeAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
  const start = performance.now();
  try {
    return await fn();
  } finally {
    const duration = performance.now() - start;
  }
}

export async function generateStory(
  emotion: string,
  character: string
): Promise<PromptGeneratedStory> {
  const storyId = `story_${emotion}_${character}`
    .toLowerCase()
    .replace(/\s+/g, "_");

  const promptOptions: StoryPromptOptions = {
    storyId,
    emotion,
    character,
    format: "semilla",
    ageGroup: "7-9",
    techniquePrimary: "breathing_condor",
    techniqueSecondary: null,
  };

  const prompt2 = buildStoryPrompt(promptOptions);

  // Medir fetch OpenAI API
  const result = await timeAsync("fetch OpenAI API", async () => {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini", // Usando gpt-4o-mini que es más estable que gpt-4.1-nano
      messages: [{ role: "user", content: prompt2 }],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 2000,
    });

    return response;
  });


  const content = result?.choices?.[0]?.message?.content;
  if (!content || typeof content !== "string") {
    throw new Error("Respuesta inesperada del modelo.");
  }

  // Medir parseo JSON
  const story = await timeAsync("parse JSON contenido", async () => {
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No se pudo extraer JSON del modelo.");
    return JSON.parse(match[0]) as PromptGeneratedStory;
  });

  if (!story.steps || story.steps.length < 2) {
    throw new Error("Historia incompleta.");
  }

  story.guideId = character;
  story.initialStepId = "scene_1";

  // Medir procesamiento post-parseo
  await timeAsync("procesar steps", async () => {
    story.steps.forEach((step, idx) => {
      const prompt = step.prompt_img;
      const filename = buildImageFilename(prompt);

      step.visuals = {
        ...step.visuals,
        backgroundImage: filename,
      };

      step.id = `scene_${idx + 1}`;
    });
  });

  return story;
}
