"use client";
import { Lightbulb } from "lucide-react";
import Link from "next/link";

export function JournalFooter() {
  return (
    <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl p-6 text-center">
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
          <Lightbulb className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-slate-800">
          Consejo de Mundo Interior
        </span>
      </div>
      <p className="text-slate-700 text-sm">
        Para gestión completa de perfiles y configuraciones, visita{" "}
        <Link
          href="/parentDashboard?section=ninos"
          className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          Mis Exploradores
        </Link>
        .
      </p>
    </div>
  );
}
