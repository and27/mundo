"use client";

import React from "react";
import { HiSparkles } from "react-icons/hi2";

export default function CreateStoryCTA({ onClick }: { onClick: () => void }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <button
        onClick={onClick}
        className="w-full bg-white/10 backdrop-blur-xl border border-white/20 hover:border-indigo-400/40 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:bg-white/15 shadow-lg hover:shadow-xl"
      >
        <HiSparkles className="w-5 h-5 text-purple-300" />
        Crear tu propio cuento emocional
      </button>

      <p className="text-slate-400 text-sm mt-3">
        Genera historias personalizadas según la situación de tu hijo
      </p>
    </div>
  );
}
