import Image from "next/image";
import { Play, Clock } from "lucide-react";
import { GuideWithCharacter } from "@/types/ai";
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
  return (
    <button
      onClick={onPlay}
      className="h-full flex flex-col relative rounded-2xl overflow-hidden text-left transition transform hover:scale-[1.02]"
    >
      <div className="relative h-40 ">
        <Image
          src="/images/all.webp"
          alt={guide.guideTitle}
          fill
          className="object-cover"
        />

        {(isCompleted || currentStep) && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-neutral-800">
            {isCompleted ? "✓ Listo" : `Paso ${currentStep} de ${totalSteps}`}
          </div>
        )}
      </div>

      {/* meta content */}
      <div className="p-5 bg-white flex flex-col flex-1 gap-5">
        <h3 className="text-sm font-semibold text-black line-clamp-2">
          {guide.guideTitle}
        </h3>
        <div className="flex items-center justify-between mt-auto">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-black">
            <Play size={16} />
            Escuchar
          </span>

          <span className="inline-flex items-center gap-1 text-xs text-black/70">
            <Clock size={14} />
            {getDuration(guide)}
          </span>
        </div>
      </div>
    </button>
  );
}
