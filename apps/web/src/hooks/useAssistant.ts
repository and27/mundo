import type { GuideWithCharacter } from "@/types/ai";
import { useState, useEffect } from "react";
import { authFetch } from "@/lib/authFetch";
import { inferGuideContext } from "@/lib/guideInference";
import {
  trackGuiaGenerada,
  trackGuiaGeneracionFallida,
} from "@/lib/analytics";

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

      const inference = inferGuideContext(rawData ?? {});
      const emotion = inference.emotionId;
      const character = inference.characterId;
      const resolvedId =
        typeof rawData?.id === "string" && rawData.id.trim().length > 0
          ? rawData.id
          : `story_${emotion}_${character}`;

      const finalGuide: GuideWithCharacter = {
        ...rawData,
        id: resolvedId,
        emotion,
        emotionId: emotion,
        character,
        characterId: character,
      };
      console.log("[useAssistant] rawData:", rawData);
      console.log("[useAssistant] emotion:", emotion, inference.emotionSource);
      console.log(
        "[useAssistant] character:",
        character,
        inference.characterSource
      );
      console.log("[useAssistant] finalGuide:", finalGuide);

      const metadata = rawData?._metadata as
        | {
            aiProvider?: string;
            fallback?: string;
            emotionSource?: string;
          }
        | undefined;
      trackGuiaGenerada({
        emotion,
        provider: metadata?.aiProvider,
        fallback: Boolean(metadata?.fallback),
        emotionSource: metadata?.emotionSource,
        queryLength: query.length,
      });

      setGuide(finalGuide);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      trackGuiaGeneracionFallida({
        errorMessage: message,
        queryLength: query.length,
      });
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
