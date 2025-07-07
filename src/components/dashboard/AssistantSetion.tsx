"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMundoAssistant } from "@/hooks/useAssistant";
import { useSavedGuides } from "@/hooks/useSavedGuides";
import InputForm from "../assistant/InputForm";
import ResultsDisplay from "../assistant/ResultsDisplay";

export default function AssistantSection() {
  const { isLoading, guide, error, loadingMessage, generateGuide } =
    useMundoAssistant();
  const { saveGuide } = useSavedGuides();
  const router = useRouter();

  useEffect(() => {
    if (guide && !isLoading) {
      const timer = setTimeout(() => {
        try {
          const savedId = saveGuide(guide);
          router.push(`/parentDashboard?section=guides&guideId=${savedId}`);
        } catch (error) {
          console.error("Error saving and redirecting:", error);
        }
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [guide, isLoading, saveGuide, router]);

  return (
    <div className="space-y-8">
      <InputForm isLoading={isLoading} onSubmit={generateGuide} />

      {(isLoading || guide || error) && (
        <div className="mt-12">
          <ResultsDisplay
            isLoading={isLoading}
            error={error}
            guide={guide}
            loadingMessage={loadingMessage}
          />
        </div>
      )}
    </div>
  );
}
