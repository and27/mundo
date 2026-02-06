import React from "react";
import { MessageCircle, LucideIcon } from "lucide-react";

interface SuggestionCardProps {
  suggestion: string;
  onClick: (suggestion: string) => void;
  icon?: LucideIcon;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({
  suggestion,
  onClick,
  icon: Icon = MessageCircle,
}) => (
  <button
    onClick={() => onClick(suggestion)}
    className="group text-left p-4 bg-white/90 backdrop-blur-sm hover:bg-white/95 border border-white/50 hover:border-indigo-200 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-slate-700 hover:text-indigo-600"
  >
    <div className="flex items-start gap-3">
      <Icon className="w-4 h-4 text-indigo-400 mt-0.5 group-hover:text-indigo-600 transition-colors" />
      <span className="text-sm font-medium leading-relaxed">
        {`"${suggestion}"`}
      </span>
    </div>
  </button>
);
