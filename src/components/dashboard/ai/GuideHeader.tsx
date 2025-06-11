import { ActionableGuide } from "@/types/ai";
import { Tag } from "lucide-react";

interface GuideHeaderProps {
  guide: ActionableGuide;
  rating: number;
  onRate: (rating: number) => void;
}

export default function GuideHeader({ guide }: GuideHeaderProps) {
  return (
    <div className="relative">
      <div className="text-center flex flex-col justify-center items-center gap-3">
        <div className="flex items-center justify-center gap-4">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-800 leading-tight">
            {guide.guideTitle}
          </h2>
        </div>

        {/* Tags mejorados */}
        {guide.tags.length > 0 && (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
              <Tag className="w-3 h-3 text-indigo-600" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">
              Temas abordados
            </h3>
            <div className="flex flex-wrap gap-2">
              {guide.tags.map((tag, index) => {
                const colors = [
                  "bg-blue-100 text-blue-700 border-blue-200",
                  "bg-purple-100 text-purple-700 border-purple-200",
                  "bg-green-100 text-green-700 border-green-200",
                  "bg-orange-100 text-orange-700 border-orange-200",
                  "bg-pink-100 text-pink-700 border-pink-200",
                ];
                const colorClass = colors[index % colors.length];

                return (
                  <span
                    key={tag}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 hover:shadow-sm ${colorClass}`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
