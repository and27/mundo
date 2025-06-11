// components/journal/JournalHeader.tsx
"use client";
import { Heart, Download, Sparkles, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface JournalHeaderProps {
  selectedChildId?: string;
  childName?: string;
  totalExplorers: number;
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  showInsights: boolean;
  onToggleInsights: () => void;
}

export function JournalHeader({
  selectedChildId,
  childName,
  totalExplorers,
  selectedPeriod,
  onPeriodChange,
  showInsights,
  onToggleInsights,
}: JournalHeaderProps) {
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              Bitácora Emocional
            </h1>
            <p className="text-slate-600">
              {selectedChildId && childName
                ? `Seguimiento de ${childName}`
                : `${totalExplorers} exploradores en su viaje interior`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={selectedPeriod}
            onChange={(e) => onPeriodChange(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
            <option value="quarter">Último trimestre</option>
          </select>

          <button className="group flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105">
            <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Exportar</span>
          </button>

          <button
            onClick={onToggleInsights}
            className={`group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
              showInsights
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                : "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200"
            }`}
          >
            <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">
              {showInsights ? "Ocultar" : "Mostrar"} Insights
            </span>
          </button>
        </div>
      </div>

      {selectedChildId && (
        <Link
          href="/parentDashboard?section=bitacora"
          className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 mt-4 font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Ver todos los exploradores
        </Link>
      )}
    </>
  );
}
