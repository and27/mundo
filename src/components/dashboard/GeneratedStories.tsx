"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronRight, ArrowLeft, Calendar } from "lucide-react";
import { useSavedGuides } from "@/hooks/useSavedGuides";
import GuideDisplay from "../assistant/GuideDisplay";
import StoryCard from "./StoryCard";

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

  const handlePlayStory = (guideId: string) => {
    setSelectedGuideId(guideId);
  };

  const handleDeleteStory = (guideId: string) => {
    deleteGuide(guideId);
    if (selectedGuideId === guideId) {
      setSelectedGuideId(null);
    }
  };

  const handleEditStory = (guideId: string) => {
    console.log("Edit story:", guideId);
  };

  if (selectedGuideId) {
    const currentGuide = getGuide(selectedGuideId);
    if (!currentGuide) {
      setSelectedGuideId(null);
      return null;
    }

    return (
      <div className="space-y-6">
        <nav className="flex items-center space-x-2 text-sm text-slate-600">
          <button
            onClick={() => setSelectedGuideId(null)}
            className="hover:text-slate-800 transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Guías
          </button>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="text-slate-800 font-medium">
            {currentGuide.guideTitle}
          </span>
        </nav>

        <GuideDisplay guide={currentGuide} />
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-0 space-y-6">
      <div>
        <h1 className="text-sm md:text-lg font-semibold text-slate-800 mb-2">
          📚 Tus Cuentos Generados
        </h1>
        <p className="text-sm md:text-base text-slate-600">
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
              onPlay={() => handlePlayStory(guide.id)}
              onDelete={() => handleDeleteStory(guide.id)}
              onEdit={() => handleEditStory(guide.id)}
              createdAt="Generada localmente"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Aún no tienes cuentos guardados
          </h3>
          <p className="text-slate-600 max-w-md mx-auto">
            Cuando generes tu primera guía emocional, se guardará
            automáticamente aquí para que puedas acceder a ella cuando la
            necesites.
          </p>
        </div>
      )}
    </div>
  );
}
