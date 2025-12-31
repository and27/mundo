import Image from "next/image";
import { Heart, Clock, Trash2 } from "lucide-react";
import { GuideWithCharacter } from "@/types/ai";

interface StoryCardProps {
  guide: GuideWithCharacter;
  variant: "kids" | "parent";
  onPlay?: () => void;
  onDelete?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  createdAt?: string;
}

const getSummary = (guide: GuideWithCharacter) => {
  const parts: string[] = [];
  if (guide.metaphorStory) parts.push("Metáfora");
  if (guide.conversationPlan?.phrasesToValidate?.length)
    parts.push("Validación emocional");
  if (guide.suggestedActivity?.title) parts.push("Actividad guiada");
  return parts.join(" · ");
};

export const getDuration = (guide: GuideWithCharacter) => {
  let words = 0;
  words += guide.metaphorStory?.split(" ").length || 0;
  words +=
    guide.conversationPlan?.questionsToExplore.join(" ").split(" ").length || 0;
  words += guide.suggestedActivity?.description?.split(" ").length || 0;
  return `${Math.max(1, Math.ceil(words / 200))} min`;
};

const formatShortDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export default function StoryCard({
  guide,
  variant,
  onPlay,
  onDelete,
  isFavorite = false,
  onToggleFavorite,
  createdAt,
}: StoryCardProps) {
  const isKids = variant === "kids";

  return (
    <article className="bg-white border border-neutral-200 rounded-2xl overflow-hidden transition hover:shadow-sm">
      <div className="relative h-24">
        <Image
          src={"/images/all.webp"}
          alt={guide.guideTitle}
          fill
          className="object-cover"
        />
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 transition ${
              isFavorite
                ? "text-red-500"
                : "text-neutral-400 hover:text-red-400"
            }`}
            aria-label="Favorito"
          >
            <Heart size={16} className={isFavorite ? "fill-red-500" : ""} />
          </button>
        )}
      </div>

      <div className="p-5 space-y-2">
        <header className="space-y-1">
          <h3 className="text-base font-semibold text-neutral-800 line-clamp-1">
            {guide.guideTitle}
          </h3>
          <p className="text-sm text-neutral-500">Con {guide.characterId}</p>
        </header>

        <p className="text-sm text-neutral-600 line-clamp-2">
          {getSummary(guide)}
        </p>
        {createdAt && (
          <div className="text-xs text-neutral-400">
            Guardado: {formatShortDate(createdAt)}
          </div>
        )}

        <footer className="flex items-center justify-between pt-2">
          <button
            onClick={onPlay}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
              isKids
                ? "bg-sky-100 text-sky-700 hover:bg-sky-200"
                : "bg-violet-100 text-violet-700 hover:bg-violet-200"
            }`}
          >
            Ver cuento
          </button>

          <span className="text-xs text-neutral-500 flex items-center gap-1">
            <Clock size={14} />
            {getDuration(guide)}
          </span>

          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm("¿Eliminar este cuento?")) {
                  onDelete();
                }
              }}
              className="p-2 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition"
              aria-label="Eliminar"
            >
              <Trash2 size={16} />
            </button>
          )}
        </footer>
      </div>
    </article>
  );
}
