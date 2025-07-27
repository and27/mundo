import { GoogleAuth } from "google-auth-library";
import { buildImageFilename } from "@/utils/imageUtils";
import { buildStoryPrompt } from "./buildStoryPrompt";
import { StoryPromptOptions } from "@/types/promptGenerationTypes";
import { performance } from "node:perf_hooks";
import OpenAI from "openai";

export type StoryStep = {
  id: string;
  subtitle: string;
  prompt_img: string;
  audioSrc?: string;
  isNarration?: boolean;

  visuals?: {
    type?: string;
    backgroundImage?: string;
    choices?: {
      id: string;
      label: string;
      icon?: string;
    }[];
  };

  interaction?: {
    type: "auto_proceed" | "wait_for_tap";
    nextStepId?: string;
    defaultNextStepId?: string;
    tappableTarget?: string;
    branching?: {
      choiceId: string;
      nextStepId: string;
    }[];
  };
};

export type GeneratedStory = {
  id: string;
  title: string;
  description: string;
  category: string;
  guideId: string;
  initialStepId: string;
  coverImage?: string;
  steps: StoryStep[];
};

// Inicializar cliente OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function cleanTextForTTS(text: string): string {
  return text
    .replace(/\[SONIDO_[^\]]+\]/g, "") // Remover [SONIDO_X]
    .replace(/\[SILENCIO (\d+)s\]/g, " ... ") // Pausas naturales
    .replace(/\(\d+\.{3}\d+\.{3}\d+\.{3}\)/g, "") // Remover conteos
    .replace(/\s+/g, " ") // Limpiar espacios múltiples
    .trim();
}

export async function generateAudio(
  text: string,
  filename: string
): Promise<{ buffer: Buffer; filename: string }> {
  const base64 = process.env.GOOGLE_APPLICATION_CREDENTIALS_B64;

  if (!base64) throw new Error("Missing GOOGLE_APPLICATION_CREDENTIALS_B64");

  const jsonStr = Buffer.from(base64, "base64").toString("utf8");
  const credentials = JSON.parse(jsonStr);

  const auth = new GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });

  const client = await auth.getClient();
  const token = await client.getAccessToken();

  const voiceConfig = {
    languageCode: "es-US",
    name: "es-US-Neural2-B", //es-US-Neural2-A for femenine
  };

  const audioConfig = {
    audioEncoding: "MP3",
    speakingRate: 0.95,
    pitch: -1.0,
  };

  const cleanText = cleanTextForTTS(text);
  const res = await fetch(
    "https://texttospeech.googleapis.com/v1/text:synthesize",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: { text: cleanText },
        voice: voiceConfig,
        audioConfig,
      }),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Google TTS error: ${errorText}`);
  }

  const data = await res.json();
  const buffer = Buffer.from(data.audioContent, "base64");

  return { buffer, filename };
}

async function timeAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
  const start = performance.now();
  try {
    return await fn();
  } finally {
    const duration = performance.now() - start;
    console.log(`[generateStory] ${label}: ${duration.toFixed(2)} ms`);
  }
}

export async function generateStory(
  emotion: string,
  character: string
): Promise<GeneratedStory> {
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
  console.log("[generateStory] Prompt generado");

  // Medir fetch OpenAI API
  const result = await timeAsync("fetch OpenAI API", async () => {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-nano", // Usando gpt-4o-mini que es más estable que gpt-4.1-nano
      messages: [{ role: "user", content: prompt2 }],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 2000,
    });

    return response;
  });

  console.log("[generateStory] Resultado recibido de OpenAI");

  const content = result?.choices?.[0]?.message?.content;
  if (!content || typeof content !== "string") {
    throw new Error("Respuesta inesperada del modelo.");
  }

  // Medir parseo JSON
  const story = await timeAsync("parse JSON contenido", async () => {
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No se pudo extraer JSON del modelo.");
    return JSON.parse(match[0]) as GeneratedStory;
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

export async function generateHiveImage(
  prompt: string,
  orientation: "vertical" | "horizontal" = "vertical"
): Promise<{ buffer: Buffer; filename: string }> {
  const filename = buildImageFilename(prompt);

  const imageSize =
    orientation === "horizontal"
      ? { width: 1344, height: 768 }
      : { width: 768, height: 1344 };

  const res = await fetch("https://api.thehive.ai/api/v3/hive/sdxl-enhanced", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HIVE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: {
        prompt,
        negative_prompt: "blurry, distorted, noisy, photorealistic",
        image_size: imageSize,
        num_inference_steps: 20,
        guidance_scale: 4.5,
        num_images: 1,
        seed: 42,
        output_format: "jpeg",
        output_quality: 90,
      },
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Hive image generation error: ${errorText}`);
  }

  const data = await res.json();
  const hiveImageUrl = data?.output?.[0]?.url;
  if (!hiveImageUrl) throw new Error("No se generó imagen");

  const response = await fetch(hiveImageUrl);
  const buffer = await response.arrayBuffer();
  return { buffer: Buffer.from(buffer), filename };
}
