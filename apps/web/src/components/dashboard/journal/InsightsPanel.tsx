"use client";
import { Sparkles, TrendingUp, Heart, Lightbulb } from "lucide-react";

export function InsightsPanel() {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-lg font-bold text-slate-800">
          Insights de Mundo Interior IA
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-white/50">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
            </div>
            <span className="text-sm font-semibold text-slate-800">
              Progreso General
            </span>
          </div>
          <p className="text-sm text-slate-700">
            Tendencia positiva en bienestar emocional y conexión interior.
          </p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-white/50">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
              <Heart className="w-3 h-3 text-pink-600" />
            </div>
            <span className="text-sm font-semibold text-slate-800">
              Emoción Dominante
            </span>
          </div>
          <p className="text-sm text-slate-700">
            Felicidad y curiosidad predominan en sus viajes interiores.
          </p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-white/50">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
              <Lightbulb className="w-3 h-3 text-amber-600" />
            </div>
            <span className="text-sm font-semibold text-slate-800">
              Recomendación
            </span>
          </div>
          <p className="text-sm text-slate-700">
            Narrativas andinas de expresión potenciarían su crecimiento.
          </p>
        </div>
      </div>
    </div>
  );
}
