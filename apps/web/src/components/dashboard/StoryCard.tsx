import Image from "next/image";
import { Heart, Clock, Trash2 } from "lucide-react";
import type { GuideWithCharacter, ParentGuideSection } from "@/types/ai";
import { getGuideSections } from "@/lib/guideSections";
import { toast } from "sonner";

interface StoryCardProps {
  guide: GuideWithCharacter;
  variant: "kids" | "parent";
  onPlay?: () => void;
  onDelete?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  createdAt?: string;
  badgeLabel?: string;
  isNew?: boolean;
}

const getMetaphorContent = (sections: ParentGuideSection[]) => {
  const metaphor = sections.find((section) => section.kind === "metaphor");
  return metaphor && "content" in metaphor ? metaphor.content : "";
};

export const getDuration = (guide: GuideWithCharacter) => {
  const sections = getGuideSections(guide);
  const wordCount = sections.reduce((acc, section) => {
    if (section.kind === "metaphor") {
      return acc + section.content.split(" ").length;
    }
    if (section.kind === "language") {
      const phrases = section.phrases.join(" ");
      const questions = section.questions?.join(" ") ?? "";
      return acc + phrases.split(" ").length + questions.split(" ").length;
    }
    if (section.kind === "practice") {
      return acc + section.description.split(" ").length;
    }
    if (section.kind === "understanding") {
      return acc + section.content.split(" ").length;
    }
    if (section.kind === "normalization") {
      return acc + section.bullets.join(" ").split(" ").length;
    }
    if (section.kind === "strategies") {
      return acc + section.items.join(" ").split(" ").length;
    }
    if (section.kind === "reflection") {
      return acc + section.prompts.join(" ").split(" ").length;
    }
    if (section.kind === "notes") {
      return acc + section.items.join(" ").split(" ").length;
    }
    return acc;
  }, 0);
  return `${Math.max(1, Math.ceil(wordCount / 200))} min`;
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
  badgeLabel,
  isNew = false,
}: StoryCardProps) {
  const isKids = variant === "kids";
  const sections = getGuideSections(guide);
  const description = getMetaphorContent(sections);

  const handleDelete = () => {
    if (!onDelete) return;
    toast("Eliminar este cuento?", {
      action: {
        label: "Eliminar",
        onClick: () => onDelete(),
      },
      cancel: {
        label: "Cancelar",
        onClick: () => {},
      },
      duration: 5000,
    });
  };

  return (
    <article className="group border border-neutral-200 rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="relative h-32 bg-neutral-100 overflow-hidden">
        <Image
          src={"/images/all.webp"}
          alt={guide.guideTitle}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
        {isNew && (
          <span className="absolute top-3 right-3 rounded-full bg-primary-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow">
            Nuevo
          </span>
        )}
        {badgeLabel && (
          <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-700 shadow">
            {badgeLabel}
          </span>
        )}
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
          <h3 className="mi-text-subtitle text-neutral-800 line-clamp-2">
            {guide.guideTitle}
          </h3>
        </header>

        {description && (
          <p className="mi-text-body-sm text-neutral-600 line-clamp-2">
            {description}
          </p>
        )}
        {createdAt && (
          <div className="mi-text-caption text-neutral-400">
            Guardado: {formatShortDate(createdAt)}
          </div>
        )}

        <footer className="flex items-center justify-between pt-2">
          <button
            onClick={onPlay}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5 ${
              isKids
                ? "bg-secondary-600 hover:bg-secondary-700"
                : "bg-primary-600 hover:bg-primary-700"
            }`}
          >
            Ver cuento
          </button>

          <span className="mi-text-caption text-neutral-500 flex items-center gap-1">
            <Clock size={14} />
            {getDuration(guide)}
          </span>

          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
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
