import { GoogleAuth } from "google-auth-library";
import fs from "fs";
import path from "path";
import { buildImageFilename } from "@/utils/imageUtils";
import { buildStoryPrompt } from "./buildStoryPrompt";
import { StoryPromptOptions } from "@/types/promptGenerationTypes";

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

export async function generateStory(
  emotion: string,
  character: string
): Promise<GeneratedStory> {
  const storyId = `story_${emotion}_${character}`
    .toLowerCase()
    .replace(/\s+/g, "_");
  const storyPath = path.join(
    process.cwd(),
    "public",
    "stories",
    `${storyId}.json`
  );

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
  console.log(prompt2);

  const res = await fetch(process.env.DEEPSEEK_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt2 }],
    }),
  });

  const result = await res.json();
  console.log(result);
  const content = result?.choices?.[0]?.message?.content;
  if (!content || typeof content !== "string") {
    throw new Error("Respuesta inesperada del modelo.");
  }

  const match = content.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No se pudo extraer JSON del modelo.");

  const story: GeneratedStory = JSON.parse(match[0]);
  if (!story.steps || story.steps.length < 2) {
    throw new Error("Historia incompleta.");
  }

  story.guideId = character;
  story.initialStepId = "scene_1";
  story.steps.forEach((step, idx) => {
    const prompt = step.prompt_img;
    const filename = buildImageFilename(prompt);

    step.visuals = {
      ...step.visuals,
      backgroundImage: filename,
    };

    step.id = `scene_${idx + 1}`;
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
        num_inference_steps: 30,
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
