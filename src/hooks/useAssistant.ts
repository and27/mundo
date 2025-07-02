import { ActionableGuide, GuideWithCharacter } from "@/types/ai";
import { useState, useEffect } from "react";

const loadingMessages = [
  "Contactando a Aynia...",
  "Analizando tu consulta...",
  "Paso 1: Generando el borrador creativo...",
  "Consultando el libro de sabiduría...",
  "Paso 2: Auditando con Ayni Guard...",
  "Verificando la calidad y seguridad...",
  "¡Casi listo! Preparando tu guía...",
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
      const response = await fetch("/api/generate-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(
          errorResult.error || `An error occurred: ${response.statusText}`
        );
      }

      const rawData = await response.json();

      const emotion = rawData.emotion;
      const character = getCharacterFromEmotion(emotion);

      const finalGuide: GuideWithCharacter = {
        ...rawData,
        emotion,
        character,
      };

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

function getCharacterFromEmotion(emotion: "miedo" | "ira"): "yachay" | "amaru" {
  const map = {
    miedo: "yachay",
    ira: "amaru",
  } as const;
  return map[emotion];
}
