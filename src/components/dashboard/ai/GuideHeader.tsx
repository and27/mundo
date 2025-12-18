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
      <div className="text-left flex flex-col justify-center items-center mi-stack-lg">
        <h2 className="text-2xl md:text-4xl font-bold text-indigo-900 leading-tight">
          {guide.guideTitle}
        </h2>

        {guide.tags.length > 0 && (
          <div className="hidden lg:flex items-center gap-3 mb-3">
            <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
              <Tag className="w-3 h-3 text-indigo-600" />
            </div>
            <h3 className="text-sm text-slate-600">Temas abordados</h3>
            <div className="flex flex-wrap gap-2">
              {guide.tags.map((tag) => {
                return (
                  <span
                    key={tag}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 hover:shadow-sm bg-indigo-50 text-indigo-600 border-purple-200`}
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
