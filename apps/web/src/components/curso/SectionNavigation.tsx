import { ChevronLeft, ChevronRight } from "lucide-react";

interface SectionNavigationProps {
  total: number;
  current: number;
  onNavigate: (index: number) => void;
}

export default function SectionNavigation({
  total,
  current,
  onNavigate,
}: SectionNavigationProps) {
  const isFirst = current === 0;
  const isLast = current === total - 1;

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={() => onNavigate(Math.max(0, current - 1))}
        disabled={isFirst}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
          isFirst
            ? "bg-slate-200 text-slate-400 cursor-not-allowed"
            : "bg-white/90 backdrop-blur-sm border border-white/50 text-slate-600 hover:text-slate-800 hover:scale-105"
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            onClick={() => onNavigate(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
              index === current
                ? "bg-indigo-500 scale-125"
                : index < current
                ? "bg-green-500"
                : "bg-slate-300"
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => onNavigate(Math.min(total - 1, current + 1))}
        disabled={isLast}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
          isLast
            ? "bg-slate-200 text-slate-400 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white hover:scale-105 shadow-lg"
        }`}
      >
        Siguiente
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
