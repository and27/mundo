import { useEffect, useState } from "react";
import { Save, Check } from "lucide-react";
import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import GuideDisplay from "./GuideDisplay";
import { GuideWithCharacter } from "@/types/ai";
import { useSavedGuides } from "@/hooks/useSavedGuides";

interface ResultsDisplayProps {
  isLoading: boolean;
  error: string | null;
  guide: GuideWithCharacter | null;
  loadingMessage: string;
}

export default function ResultsDisplay({
  isLoading,
  error,
  guide,
  loadingMessage,
}: ResultsDisplayProps) {
  const { saveGuide } = useSavedGuides();
  const [isSaved, setIsSaved] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  // Auto-guardar cuando aparezca una nueva guía
  useEffect(() => {
    if (guide && !isSaved && !isAutoSaving) {
      setIsAutoSaving(true);

      // Delay breve para mejor UX
      setTimeout(() => {
        try {
          saveGuide(guide);
          setIsSaved(true);
        } catch (error) {
          console.error("Error auto-saving guide:", error);
        } finally {
          setIsAutoSaving(false);
        }
      }, 1500);
    }
  }, [guide, isSaved, isAutoSaving, saveGuide]);

  // Reset estado cuando cambie la guía
  useEffect(() => {
    if (guide) {
      setIsSaved(false);
    }
  }, [guide]);

  if (isLoading) {
    return <LoadingState message={loadingMessage} />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (guide) {
    return (
      <div className="space-y-4">
        {/* Indicador de guardado */}
        {(isAutoSaving || isSaved) && (
          <div className="flex items-center justify-center p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-700">
              {isAutoSaving ? (
                <>
                  <Save className="w-4 h-4 animate-pulse" />
                  <span className="text-sm font-medium">Guardando guía...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    ¡Guía guardada! Ya está disponible en tu biblioteca
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        <GuideDisplay guide={guide} />
      </div>
    );
  }

  return <EmptyState />;
}
