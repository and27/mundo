import type { CharacterId, EmotionId, GuideWithCharacter } from "./types/ai";
import { mapEmotionLabel } from "./emotionMapping";
import { getDefaultCharacterForEmotion } from "./emotionCharacterMap";

export type EmotionSource =
  | "emotionId"
  | "emotion"
  | "id"
  | "tags"
  | "fallback";

export type CharacterSource =
  | "characterId"
  | "character"
  | "id"
  | "fallback";

export type GuideInference = {
  emotionId: EmotionId;
  characterId: CharacterId;
  emotionSource: EmotionSource;
  characterSource: CharacterSource;
};

export function normalizeEmotionInput(
  value?: string
): EmotionId | undefined {
  return mapEmotionLabel(value);
}

export function parseGuideId(
  value?: string
): { emotion?: EmotionId; character?: CharacterId } {
  if (!value) return {};
  const match = value.trim().toLowerCase().match(/^story_([^_]+)_([^_]+)$/);
  if (!match) return {};
  const emotion = normalizeEmotionInput(match[1]);
  const character =
    match[2] === "yachay" ||
    match[2] === "amaru" ||
    match[2] === "kuntur" ||
    match[2] === "hatun" ||
    match[2] === "pajaro"
      ? match[2]
      : undefined;
  return { emotion, character };
}

export function resolveEmotionId(
  guide: Partial<GuideWithCharacter>
): { emotionId: EmotionId; source: EmotionSource } {
  if (guide.emotionId) {
    return { emotionId: guide.emotionId, source: "emotionId" };
  }

  const directEmotion =
    normalizeEmotionInput((guide as { emotion?: string }).emotion) ?? undefined;
  if (directEmotion) {
    return { emotionId: directEmotion, source: "emotion" };
  }

  const parsed = parseGuideId(guide.id);
  if (parsed.emotion) {
    return { emotionId: parsed.emotion, source: "id" };
  }

  if (Array.isArray(guide.tags)) {
    for (const tag of guide.tags) {
      const normalized = normalizeEmotionInput(tag);
      if (normalized) {
        return { emotionId: normalized, source: "tags" };
      }
    }
  }

  return { emotionId: "miedo", source: "fallback" };
}

export function resolveCharacterId(
  guide: Partial<GuideWithCharacter>,
  emotionId: EmotionId
): { characterId: CharacterId; source: CharacterSource } {
  if (
    guide.characterId === "yachay" ||
    guide.characterId === "amaru" ||
    guide.characterId === "kuntur" ||
    guide.characterId === "hatun" ||
    guide.characterId === "pajaro"
  ) {
    return { characterId: guide.characterId, source: "characterId" };
  }

  if (
    guide.character === "yachay" ||
    guide.character === "amaru" ||
    guide.character === "kuntur" ||
    guide.character === "hatun" ||
    guide.character === "pajaro"
  ) {
    return { characterId: guide.character, source: "character" };
  }

  const parsed = parseGuideId(guide.id);
  if (parsed.character) {
    return { characterId: parsed.character, source: "id" };
  }

  return {
    characterId: getDefaultCharacterForEmotion(emotionId),
    source: "fallback",
  };
}

export function inferGuideContext(
  guide: Partial<GuideWithCharacter>
): GuideInference {
  const emotion = resolveEmotionId(guide);
  const character = resolveCharacterId(guide, emotion.emotionId);
  return {
    emotionId: emotion.emotionId,
    characterId: character.characterId,
    emotionSource: emotion.source,
    characterSource: character.source,
  };
}
