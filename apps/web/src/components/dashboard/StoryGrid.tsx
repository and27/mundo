"use client";

import { memo } from "react";
import { Calendar } from "lucide-react";
import type { GuideWithCharacter } from "@/types/ai";
import StoryCard from "./StoryCard";

type Props = {
  guides: GuideWithCharacter[];
  createdAtById: Record<string, string>;
  latestGuideId: string | null;
  isLoaded: boolean;
  onPlay: (guideId: string) => void;
  onDelete: (guideId: string) => void;
  formatEmotionLabel: (emotion?: string) => string;
};

function StoryGrid({
  guides,
  createdAtById,
  latestGuideId,
  isLoaded,
  onPlay,
  onDelete,
  formatEmotionLabel,
}: Props) {
  if (!isLoaded)
    return (
      <div className="flex items-center justify-center py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700" />
      </div>
    );

  if (guides.length === 0) {
    return (
      <div className="bg-neutral-50 border border-neutral-200 rounded-2xl py-16 px-6 text-center mi-stack-md">
        <div className="w-16 h-16 mx-auto rounded-full bg-neutral-100 flex items-center justify-center">
          <Calendar className="w-8 h-8 text-neutral-400" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-800">
          Aún no tienes cuentos guardados
        </h3>
        <p className="text-neutral-600 max-w-md mx-auto">
          Cuando generes tu primera guía emocional, se guardará automáticamente
          aquí para que puedas acceder a ella cuando la necesites.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {guides.map((guide, index) => (
        <StoryCard
          key={`${guide.id}-${index}`}
          guide={guide}
          variant="parent"
          onPlay={() => onPlay(guide.id)}
          onDelete={() => onDelete(guide.id)}
          createdAt={createdAtById[guide.id] || "Generada en la nube"}
          badgeLabel={formatEmotionLabel(guide.emotionId)}
          isNew={guide.id === latestGuideId}
        />
      ))}
    </div>
  );
}

export default memo(StoryGrid);
