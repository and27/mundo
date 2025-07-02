import { GoogleAuth } from "google-auth-library";
import fs from "fs";
import path from "path";
import { buildImageFilename } from "@/utils/imageUtils";

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

export async function generateAudio(
  text: string,
  filename: string
): Promise<string> {
  const relativeUrl = `/audio/generated/${filename}`;
  const audioPath = path.join(process.cwd(), "public", relativeUrl);

  if (fs.existsSync(audioPath)) return `/audio/generated/${filename}`;

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

  const res = await fetch(
    "https://texttospeech.googleapis.com/v1/text:synthesize",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: { text },
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

  fs.mkdirSync(path.dirname(audioPath), { recursive: true });
  fs.writeFileSync(audioPath, buffer);

  return `/audio/generated/${filename}`;
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

  if (fs.existsSync(storyPath)) {
    const content = fs.readFileSync(storyPath, "utf8");
    return JSON.parse(content);
  }

  const prompt = `
Genera una historia breve para niños en JSON estructurado. Solo 2 o 3 escenas máximo.
Debe estar dividida en pasos como un cuento narrado. Usa tono simbólico y emocional. Formato exacto:

{
  "id": "${storyId}",
  "title": "Yachay, el Joven Puma y la Montaña",
  "description": "Una historia para transformar el miedo",
  "category": "emotions",
  "steps": [
    {
      "id": "scene_1",
      "subtitle": "Texto de esta parte del cuento",
      "prompt_img": "Descripción visual breve de esta escena, sin personajes",
      "visuals": {
        "type": "scene",
        "backgroundImage": "nombre_sugerido_bg.png"
      }
    }
  ]
}

Reglas clave:
- El campo \`prompt_img\` debe describir el entorno visual de la escena en 1 oración, sin personajes.
- Evita repetir el \`subtitle\`. Solo describe el espacio, iluminación, atmósfera, paisaje o elementos mágicos.
- Usa inglés en \`prompt_img\`, incluso si el cuento es en español.

La emoción central es: ${emotion}. El personaje es: ${character}.
Devuelve solo el JSON, sin explicaciones.
`.trim();

  const res = await fetch(process.env.DEEPSEEK_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const result = await res.json();
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

  for (const step of story.steps) {
    const prompt = step.prompt_img;
    const filename = buildImageFilename(prompt);

    step.visuals = {
      ...step.visuals,
      backgroundImage: filename,
    };
  }

  fs.mkdirSync(path.dirname(storyPath), { recursive: true });
  fs.writeFileSync(storyPath, JSON.stringify(story, null, 2), "utf8");

  return story;
}

export async function generateHiveImage(
  prompt: string,
  orientation: "vertical" | "horizontal" = "vertical"
): Promise<string> {
  const imageUrl = buildImageFilename(prompt);
  const imagePath = path.join(process.cwd(), "public", imageUrl);

  if (fs.existsSync(imagePath)) {
    return imageUrl;
  }

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
  fs.mkdirSync(path.dirname(imagePath), { recursive: true });
  fs.writeFileSync(imagePath, Buffer.from(buffer));

  return imageUrl;
}
