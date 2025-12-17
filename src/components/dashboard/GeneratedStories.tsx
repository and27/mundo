"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronRight, ArrowLeft, Calendar } from "lucide-react";
import { useSavedGuides } from "@/hooks/useSavedGuides";
import GuideDisplay from "../assistant/GuideDisplay";
import StoryCard from "./StoryCard";
import GuideActions from "./ai/GuideActionts";

export default function GeneratedStories() {
  const searchParams = useSearchParams();
  const guideIdFromUrl = searchParams.get("guideId");

  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(
    guideIdFromUrl
  );
  const { savedGuides, isLoaded, deleteGuide, getGuide } = useSavedGuides();

  useEffect(() => {
    if (guideIdFromUrl && guideIdFromUrl !== selectedGuideId) {
      setSelectedGuideId(guideIdFromUrl);
    }
  }, [guideIdFromUrl, selectedGuideId]);

  if (selectedGuideId) {
    const currentGuide = getGuide(selectedGuideId);
    if (!currentGuide) {
      setSelectedGuideId(null);
      return null;
    }

    return (
      <section className="mi-section">
        <div className="max-w-4xl mx-auto px-4 mi-stack-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <nav className="flex items-center gap-2 text-sm text-neutral-500">
              <button
                onClick={() => setSelectedGuideId(null)}
                className="flex items-center gap-1 hover:text-neutral-800 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Guías
              </button>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
              <span className="text-neutral-800 font-medium">
                {currentGuide.guideTitle}
              </span>
            </nav>

            <GuideActions guide={currentGuide} />
          </div>

          <GuideDisplay guide={currentGuide} />
        </div>
      </section>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700" />
      </div>
    );
  }

  return (
    <section className="mi-section">
      <div className="max-w-4xl mx-auto px-4 mi-stack-lg">
        <div className="mi-section-header">
          <h1 className="text-xl md:text-2xl font-bold text-neutral-800 mi-section-title">
            Tus cuentos generados
          </h1>
          <p className="text-neutral-600">
            Accede a todos los cuentos emocionales que has creado (
            {savedGuides.length})
          </p>
        </div>

        {savedGuides.length > 0 ? (
          <div className="grid gap-4">
            {savedGuides.map((guide, index) => (
              <StoryCard
                key={`${guide.id}-${index}`}
                guide={guide}
                variant="parent"
                onPlay={() => setSelectedGuideId(guide.id)}
                onDelete={() => {
                  deleteGuide(guide.id);
                  if (selectedGuideId === guide.id) {
                    setSelectedGuideId(null);
                  }
                }}
                onEdit={() => {}}
                createdAt="Generada localmente"
              />
            ))}
          </div>
        ) : (
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl py-16 px-6 text-center mi-stack-md">
            <div className="w-16 h-16 mx-auto rounded-full bg-neutral-100 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-800">
              Aún no tienes cuentos guardados
            </h3>
            <p className="text-neutral-600 max-w-md mx-auto">
              Cuando generes tu primera guía emocional, se guardará
              automáticamente aquí para que puedas acceder a ella cuando la
              necesites.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
