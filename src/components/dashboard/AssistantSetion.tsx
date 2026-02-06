"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMundoAssistant } from "@/hooks/useAssistant";
import { useSavedGuides } from "@/hooks/useSavedGuides";
import InputForm from "../assistant/InputForm";
import { authFetch } from "@/lib/authFetch";
import type { StoryJobCreateResponse } from "@/types/storyJob";

export default function AssistantSection() {
  const { isLoading, guide, error, loadingMessage, generateGuide } =
    useMundoAssistant();
  const { saveGuide } = useSavedGuides();
  const router = useRouter();

  useEffect(() => {
    if (guide && !isLoading) {
      const timer = setTimeout(() => {
        const persistAndRedirect = async () => {
          try {
            const savedId = await saveGuide(guide);
            let jobIdParam = "";
            if (guide.emotionId && guide.characterId) {
              try {
                const res = await authFetch("/api/story/export", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    emotion: guide.emotionId,
                    character: guide.characterId,
                  }),
                });
                if (res.ok) {
                  const data = (await res.json()) as StoryJobCreateResponse;
                  jobIdParam = `&jobId=${data.jobId}`;
                }
              } catch (jobError) {
                console.error("Error creating story job:", jobError);
              }
            }
            router.push(
              `/parentDashboard?section=guides&guideId=${savedId}${jobIdParam}`
            );
          } catch (error) {
            console.error("Error saving and redirecting:", error);
          }
        };

        persistAndRedirect();
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [guide, isLoading, saveGuide, router]);

  return (
    <>
      <InputForm isLoading={isLoading} onSubmit={generateGuide} />
    </>
  );
}
