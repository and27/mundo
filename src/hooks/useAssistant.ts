import type { CharacterId, EmotionId, GuideWithCharacter } from "@/types/ai";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { authFetch } from "@/lib/authFetch";

const loadingMessages = [
  "Contactando a Aynia...",
  "Analizando tu consulta...",
  "Paso 1: Generando el borrador creativo...",
  "Consultando el libro de sabidur｛...",
  "Paso 2: Auditando con Ayni Guard...",
  "Verificando la calidad y seguridad...",
  "耶asi listo! Preparando tu gu｛...",
];

export function useMundoAssistant() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [guide, setGuide] = useState<GuideWithCharacter | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>(
    loadingMessages[0]
  );

  useEffect(() => {
    if (isLoading) {
      let messageIndex = 0;
      const interval = setInterval(() => {
        if (loadingMessages.length >= messageIndex) {
          messageIndex = messageIndex + 1;
          setLoadingMessage(loadingMessages[messageIndex]);
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const generateGuide = async (query: string) => {
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setGuide(null);
    setError(null);
    setLoadingMessage(loadingMessages[0]);

    try {
      const response = await authFetch("/api/generate-guide", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, useOpenAI: true }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(
          errorResult.error || `An error occurred: ${response.statusText}`
        );
      }

      const rawData = await response.json();

      const parsedFromId = parseGuideId(rawData?.id);
      const emotion =
        normalizeEmotionInput(rawData?.emotionId ?? rawData?.emotion) ??
        parsedFromId.emotion ??
        resolveEmotionFromTags(rawData?.tags);
      const character =
        parsedFromId.character ?? getCharacterFromEmotion(emotion);
      const resolvedId =
        typeof rawData?.id === "string" && rawData.id.trim().length > 0
          ? rawData.id
          : `story_${emotion ?? "miedo"}_${character}`;

      const finalGuide: GuideWithCharacter = {
        ...rawData,
        id: resolvedId,
        emotion,
        emotionId: emotion,
        character,
        characterId: character,
      };
      console.log("[useAssistant] rawData:", rawData);
      console.log("[useAssistant] emotion:", emotion);
      console.log("[useAssistant] character:", character);
      console.log("[useAssistant] finalGuide:", finalGuide);

      setGuide(finalGuide);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, guide, error, loadingMessage, generateGuide };
}

function getCharacterFromEmotion(emotion?: EmotionId): CharacterId {
  if (emotion === "ira") return "amaru";
  return "yachay";
}

function normalizeEmotionInput(value?: string): EmotionId | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (normalized === "miedo") return "miedo";
  if (normalized === "ira") return "ira";
  if (normalized === "tristeza") return "tristeza";
  if (normalized === "verguenza" || normalized === "vergüenza")
    return "verguenza";
  if (normalized === "celos") return "celos";
  if (normalized === "alegria" || normalized === "alegría")
    return "alegria";
  return undefined;
}

function resolveEmotionFromTags(tags?: string[]): EmotionId | undefined {
  if (!Array.isArray(tags)) return undefined;
  for (const tag of tags) {
    const normalized = normalizeEmotionInput(tag);
    if (normalized) return normalized;
  }
  return undefined;
}

function parseGuideId(
  value?: string
): { emotion?: EmotionId; character?: CharacterId } {
  if (!value) return {};
  const match = value.trim().toLowerCase().match(/^story_([^_]+)_([^_]+)$/);
  if (!match) return {};
  const emotion = normalizeEmotionInput(match[1]);
  const character =
    match[2] === "yachay" || match[2] === "amaru" ? match[2] : undefined;
  return { emotion, character };
}
