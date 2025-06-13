"use client";
import { useMundoAssistant } from "@/hooks/useAssistant";
import InputForm from "../assistant/InputForm";
import ResultsDisplay from "../assistant/ResultsDisplay";

export default function AssistantSection() {
  const { isLoading, guide, error, loadingMessage, generateGuide } =
    useMundoAssistant();

  return (
    <>
      <InputForm isLoading={isLoading} onSubmit={generateGuide} />
      <div className="mt-12">
        <ResultsDisplay
          isLoading={isLoading}
          error={error}
          guide={guide}
          loadingMessage={loadingMessage}
        />
      </div>
    </>
  );
}
