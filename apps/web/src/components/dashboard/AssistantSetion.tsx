"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputForm from "../assistant/InputForm";
import { authFetch } from "@/lib/authFetch";

const EMOTION_CHOICES = [
  "miedo",
  "ira",
  "tristeza",
  "verguenza",
  "celos",
  "alegria",
  "calma",
];

export default function AssistantSection() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [needsEmotionSelection, setNeedsEmotionSelection] = useState(false);
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (query: string) => {
    const encoded = encodeURIComponent(query);
    setIsRedirecting(true);
    setErrorMessage(null);
    setNeedsEmotionSelection(false);
    setPendingQuery(query);

    try {
      const res = await authFetch("/api/emotion/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        let errMessage = "No pudimos inferir la emoción.";
        let requiresEmotionSelection = false;
        try {
          const errJson = (await res.json()) as {
            error?: string;
            requiresEmotionSelection?: boolean;
          };
          if (errJson?.error) errMessage = errJson.error;
          if (errJson?.requiresEmotionSelection) {
            requiresEmotionSelection = true;
          }
        } catch {
          const errText = await res.text();
          if (errText) errMessage = errText;
        }
        if (requiresEmotionSelection) {
          setNeedsEmotionSelection(true);
          setErrorMessage(errMessage);
          return;
        }
        throw new Error(errMessage);
      }

      const data = (await res.json()) as { emotionId?: string };
      const emotionParam = data?.emotionId
        ? `&newStoryEmotion=${encodeURIComponent(data.emotionId)}`
        : "";
      router.push(
        `/parentDashboard?section=guides&newStoryQuery=${encoded}${emotionParam}`
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido.";
      setErrorMessage(message);
    } finally {
      setIsRedirecting(false);
    }
  };

  return (
    <>
      <InputForm isLoading={isRedirecting} onSubmit={handleSubmit} />
      {needsEmotionSelection && pendingQuery && (
        <div className="max-w-4xl px-5 md:px-20 mi-stack-sm">
          <p className="text-sm text-neutral-600">
            {errorMessage ??
              "No pudimos inferir la emoción. Elige cuál es la emoción que más representa lo que nos cuentas."}
          </p>
          <div className="flex flex-wrap gap-2">
            {EMOTION_CHOICES.map((emotion) => (
              <button
                key={emotion}
                onClick={() => {
                  const encoded = encodeURIComponent(pendingQuery);
                  router.push(
                    `/parentDashboard?section=guides&newStoryQuery=${encoded}&newStoryEmotion=${encodeURIComponent(
                      emotion
                    )}`
                  );
                }}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border transition border-neutral-200 text-neutral-700 hover:border-neutral-300"
              >
                {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
