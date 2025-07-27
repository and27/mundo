import { Play, Heart, Clock, Trash2, Edit3, Calendar } from "lucide-react";
import { GuideWithCharacter } from "@/types/ai";

interface StoryCardProps {
  guide: GuideWithCharacter;
  variant: "kids" | "parent";
  onPlay?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  createdAt?: string;
}

const getSummary = (guide: GuideWithCharacter) => {
  const elements: string[] = [];

  if (guide.metaphorStory) {
    elements.push(`Metáfora: ${guide.metaphorStory.slice(0, 30)}...`);
  }

  if (guide.conversationPlan?.phrasesToValidate?.length) {
    elements.push(`${guide.conversationPlan.phrasesToValidate.length} frases`);
  }

  if (guide.suggestedActivity?.title) {
    elements.push(`Actividad: ${guide.suggestedActivity.title}`);
  }

  return elements.join(" • ");
};

const getDuration = (guide: GuideWithCharacter) => {
  let wordCount = 0;
  wordCount += guide.metaphorStory?.split(" ").length || 0;
  wordCount +=
    guide.conversationPlan?.questionsToExplore.join(" ").split(" ").length || 0;
  wordCount += guide.suggestedActivity?.description?.split(" ").length || 0;

  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min`;
};

export default function StoryCard({
  guide,
  variant,
  onPlay,
  onDelete,
  onEdit,
  isFavorite = false,
  onToggleFavorite,
  createdAt,
}: StoryCardProps) {
  const isKids = variant === "kids";

  const colorScheme = isKids
    ? {
        gradient: "from-sky-200 via-blue-200 to-cyan-200",
        primary: "sky",
        accent: "blue",
      }
    : {
        gradient: "from-purple-200 via-indigo-200 to-violet-200",
        primary: "purple",
        accent: "indigo",
      };

  if (isKids) {
    return (
      <div className="group cursor-pointer" onClick={onPlay}>
        <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-[1.02] relative">
          {isFavorite && onToggleFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              className="absolute top-4 right-4 z-10 bg-red-100 rounded-full p-2"
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </button>
          )}

          <div
            className={`relative h-48 bg-gradient-to-br ${colorScheme.gradient} flex items-center justify-center overflow-hidden`}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full"></div>
              <div className="absolute bottom-6 right-8 w-6 h-6 bg-white rounded-full"></div>
              <div className="absolute top-1/2 right-4 w-4 h-4 bg-white rounded-full"></div>
            </div>

            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white rounded-full p-4 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                <Play
                  className={`w-8 h-8 text-${colorScheme.primary}-500 fill-${colorScheme.primary}-500`}
                />
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3
              className={`font-bold text-gray-800 text-xl mb-2 line-clamp-2 group-hover:text-${colorScheme.primary}-600 transition-colors`}
            >
              {guide.guideTitle}
            </h3>

            <p
              className={`text-${colorScheme.primary}-600 text-sm font-semibold mb-4`}
            >
              Con {guide.character}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-gray-500 text-sm">
                <span className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                  <Clock className="w-4 h-4" />
                  {getDuration(guide)}
                </span>
              </div>

              <div
                className={`bg-gradient-to-r from-sky-600 to-blue-600  hover:from-${colorScheme.primary}-500 hover:to-${colorScheme.accent}-500 text-white p-3 rounded-full transition-all transform hover:scale-110 shadow-lg`}
              >
                <Play className="w-5 h-5 fill-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer p-6 group">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0" onClick={onPlay}>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-800 mb-1 group-hover:text-purple-600 transition-colors">
                {guide.guideTitle}
              </h3>
              <p className="text-purple-600 text-sm font-medium">
                Con {guide.character}
              </p>
            </div>
          </div>

          <p className="text-slate-600 text-sm mb-4 line-clamp-2">
            {getSummary(guide)}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
              📖 Metáfora
            </span>
            {guide.suggestedActivity?.title && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                🎯 {guide.suggestedActivity.title}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-500">
            {createdAt && (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {createdAt}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {getDuration(guide)} lectura
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 ml-4">
          {isFavorite && onToggleFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Quitar de favoritos"
            >
              <Heart className="w-4 h-4 fill-red-400" />
            </button>
          )}

          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
              title="Editar historia"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}

          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (
                  window.confirm("¿Estás seguro de eliminar esta historia?")
                ) {
                  onDelete();
                }
              }}
              className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Eliminar historia"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onPlay}
            className="bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-500 hover:to-indigo-500 text-white p-3 rounded-full transition-all transform hover:scale-110 shadow-lg"
            title="Ver historia completa"
          >
            <Play className="w-5 h-5 fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
