import OpenAI from "openai";
import { parseLlmJson } from "@/lib/llm/parse";
import type { EmotionId } from "@/types/ai";
import { recordOpenAICall } from "@/lib/telemetry/openaiMetrics";

type EmotionClassifierProvider = "openai";

type EmotionClassification = {
  emotion: EmotionId | "indefinida";
  confidence?: number;
  reasoning?: string;
};

const DEFAULT_MODEL = "gpt-4.1-mini";

const BASE_EMOTIONS: EmotionId[] = [
  "miedo",
  "ira",
  "tristeza",
  "verguenza",
  "celos",
  "alegria",
  "calma",
];

function buildPrompt(input: string) {
  const baseList = BASE_EMOTIONS.map((value) => `"${value}"`).join(", ");
  return [
    "Clasifica la emocion principal del texto en una sola categoria base.",
    `Categorias permitidas: ${baseList} o "indefinida" si no hay suficiente informacion.`,
    "Si el texto es ambiguo o no menciona una emocion clara, usa emotion=\"indefinida\" y confidence <= 0.4.",
    "Responde SOLO JSON valido con campos: emotion, confidence, reasoning.",
    "confidence debe ser un numero entre 0 y 1.",
    "",
    `Texto: ${input}`,
  ].join("\n");
}

function getProvider(): EmotionClassifierProvider {
  const provider = (process.env.EMOTION_CLASSIFIER_PROVIDER ?? "openai")
    .toLowerCase()
    .trim();
  if (provider !== "openai") {
    throw new Error(
      `Unsupported EMOTION_CLASSIFIER_PROVIDER "${provider}". Use "openai".`
    );
  }
  return provider;
}

export async function classifyEmotionLabel(
  input: string,
  timeoutMs: number
): Promise<EmotionClassification | null> {
  const provider = getProvider();
  if (provider !== "openai") return null;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    timeout: timeoutMs,
  });

  const response = await openai.chat.completions.create({
    model: process.env.EMOTION_CLASSIFIER_MODEL ?? DEFAULT_MODEL,
    messages: [{ role: "user", content: buildPrompt(input) }],
    temperature: 0,
    response_format: { type: "json_object" },
    max_tokens: 300,
  });
  recordOpenAICall("chat.completions.create", {
    model: process.env.EMOTION_CLASSIFIER_MODEL ?? DEFAULT_MODEL,
    label: "emotionClassifier",
  });

  const content = response.choices[0]?.message?.content;
  if (!content) return null;

  const parsed = parseLlmJson<EmotionClassification>(content, "emotion_class");
  if (!parsed.ok) return null;

  if (!BASE_EMOTIONS.includes(parsed.data.emotion)) return null;
  return {
    ...parsed.data,
    confidence:
      typeof parsed.data.confidence === "number" ? parsed.data.confidence : 0,
  };
}
