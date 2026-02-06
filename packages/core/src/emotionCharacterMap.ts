import type { CharacterId, EmotionId } from "./types/ai";

const DEFAULT_CHARACTER_BY_EMOTION: Record<EmotionId, CharacterId> = {
  miedo: "yachay",
  ira: "amaru",
  tristeza: "kuntur",
  verguenza: "kuntur",
  celos: "amaru",
  alegria: "pajaro",
  calma: "hatun",
};

export function getDefaultCharacterForEmotion(
  emotionId: EmotionId
): CharacterId {
  return DEFAULT_CHARACTER_BY_EMOTION[emotionId] ?? "yachay";
}
