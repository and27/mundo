import { mapEmotionLabel } from "@/lib/emotionMapping";
import { classifyEmotionLabel } from "@/lib/llm/emotionClassifier";
import type { EmotionId } from "@/types/ai";

type EmotionResolution =
  | { ok: true; emotionId: EmotionId; source: "manual" | "inferred" }
  | { ok: false; error: string };

const toNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const EMOTION_CLASSIFIER_MIN_CONFIDENCE = toNumber(
  process.env.EMOTION_CLASSIFIER_MIN_CONFIDENCE,
  0.6
);

export async function resolveEmotionForGuide(
  userQuery: string,
  manualEmotion?: string
): Promise<EmotionResolution> {
  if (manualEmotion) {
    const normalized = mapEmotionLabel(manualEmotion);
    if (!normalized) {
      return {
        ok: false,
        error:
          "La emoción seleccionada no es válida. Por favor, elige una emoción disponible.",
      };
    }
    return { ok: true, emotionId: normalized, source: "manual" };
  }

  const direct = mapEmotionLabel(userQuery);
  if (direct) {
    return { ok: true, emotionId: direct, source: "inferred" };
  }

  const classified = await classifyEmotionLabel(userQuery, 20000);
  if (
    classified?.emotion &&
    (classified.confidence ?? 0) >= EMOTION_CLASSIFIER_MIN_CONFIDENCE
  ) {
    return { ok: true, emotionId: classified.emotion, source: "inferred" };
  }

  return {
    ok: false,
    error:
      "No pudimos inferir la emoción. Elige cuál es la emoción que más representa lo que nos cuentas.",
  };
}
