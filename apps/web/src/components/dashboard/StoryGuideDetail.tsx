"use client";

import { ArrowLeft, ChevronRight } from "lucide-react";
import type { GuideWithCharacter } from "@/types/ai";
import GuideDisplay from "../assistant/GuideDisplay";

type Props = {
  guide: GuideWithCharacter;
  onBack: () => void;
};

export default function StoryGuideDetail({ guide, onBack }: Props) {
  return (
    <div className="max-w-5xl px-4 md:px-20 mi-stack-md">
      <div className="mi-section-header flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <nav className="flex items-center gap-2 text-sm text-neutral-500">
          <button
            onClick={onBack}
            className="flex items-center gap-1 hover:text-neutral-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Biblioteca
          </button>
          <ChevronRight className="w-4 h-4 text-neutral-400" />
          <span className="text-neutral-800 font-medium line-clamp-1">
            {guide.guideTitle}
          </span>
        </nav>
      </div>

      <GuideDisplay guide={guide} />
    </div>
  );
}
