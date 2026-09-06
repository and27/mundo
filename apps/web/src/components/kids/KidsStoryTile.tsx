import Image from "next/image";
import { Play } from "lucide-react";
import { GuideWithCharacter } from "@/types/ai";
import { getCharacterImage } from "@/lib/getCharacterImage";
import { getDuration } from "../dashboard/StoryCard";

interface KidsStoryTileProps {
  guide: GuideWithCharacter;
  onPlay: () => void;
  isCompleted?: boolean;
  currentStep?: number;
  totalSteps?: number;
}

export function KidsStoryTile({
  guide,
  onPlay,
  isCompleted,
  currentStep,
  totalSteps,
}: KidsStoryTileProps) {
  // Cada cuento muestra a su guia, no la misma foto de grupo para todos.
  const characterImage = getCharacterImage(
    guide.characterId ?? "hatun",
    guide.emotionId ?? "neutro"
  );

  return (
    <button
      type="button"
      onClick={onPlay}
      className="group h-full flex flex-col text-left rounded-[var(--radius-card)] mi-surface-2 p-5 min-h-[168px] transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <span aria-hidden className="mi-ground-shadow bottom-0 h-3 w-16" />
          <Image
            src={characterImage}
            alt=""
            width={88}
            height={88}
            className="relative w-[88px] h-[88px] object-contain transition-transform duration-200 group-hover:-translate-y-1"
          />
        </div>

        <div className="flex-1 min-w-0">
          {(isCompleted || currentStep) && (
            <span className="inline-block mb-2 px-3 py-1 rounded-full mi-text-body-sm font-semibold bg-white/90 text-neutral-800">
              {isCompleted ? "Listo" : `Paso ${currentStep} de ${totalSteps}`}
            </span>
          )}
          <h3 className="mi-text-kid-name text-white line-clamp-2">
            {guide.guideTitle}
          </h3>
          <p className="mi-text-body-sm text-white/65 mt-1">
            {getDuration(guide)}
          </p>
        </div>
      </div>

      <span className="mi-voice-kid mt-auto pt-5 inline-flex items-center gap-2 text-lg font-bold text-[var(--color-action-400)]">
        <Play size={20} aria-hidden />
        Escuchar
      </span>
    </button>
  );
}
