"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  User,
  Edit3,
  TrendingUp,
  Gamepad2,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Calendar,
  Star,
  Heart,
} from "lucide-react";

// Asegúrate de que el tipo ChildProfile esté disponible aquí (importado o definido)
interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatarUrl?: string;
  lastJourney?: string;
  nextSuggestedJourney?: string;
  totalJourneys: number;
}

interface ExplorerCardProps {
  child: ChildProfile;
}

export default function ExplorerCard({ child }: ExplorerCardProps) {
  const [copied, setCopied] = useState(false);

  const accessCode =
    child.id.slice(-4).toUpperCase() +
    Math.random().toString(36).slice(-2).toUpperCase();

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(accessCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error al copiar:", error);
    }
  };

  return (
    <article className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col h-full">
      {/* Header del perfil */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center border-2 border-white shadow-lg">
          {child.avatarUrl ? (
            <Image
              src={child.avatarUrl}
              alt={`Avatar de ${child.name}`}
              fill
              className="object-cover"
            />
          ) : (
            <User className="w-8 h-8 text-indigo-600" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-slate-800 truncate mb-1">
            {child.name}
          </h3>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {child.age} años
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              {child.totalJourneys} viajes
            </span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow space-y-4 mb-6">
        {child.lastJourney && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center">
                <Heart className="w-3 h-3 text-slate-600" />
              </div>
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Último viaje
              </span>
            </div>
            <p className="text-sm text-slate-800 font-medium">
              {child.lastJourney}
            </p>
          </div>
        )}

        {child.nextSuggestedJourney && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                Mundo Interior Sugiere
              </span>
            </div>
            <p className="text-sm text-slate-800 font-medium">
              {child.nextSuggestedJourney}
            </p>
          </div>
        )}
      </div>

      {/* Código de acceso */}
      <div className="bg-slate-100 border border-slate-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
              Código de acceso
            </div>
            <code className="text-sm font-mono font-bold text-slate-800 bg-white px-2 py-1 rounded border">
              {accessCode}
            </code>
          </div>
          <button
            onClick={handleCopyCode}
            className="group flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all duration-200"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                ¡Copiado!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 group-hover:scale-110 transition-transform" />
                Copiar
              </>
            )}
          </button>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="space-y-3">
        {/* Botones secundarios */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="#"
            className="group flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 hover:text-slate-800 transition-all duration-200"
          >
            <TrendingUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Progreso</span>
          </Link>

          <Link
            href="#"
            className="group flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 hover:text-slate-800 transition-all duration-200"
          >
            <Edit3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Editar</span>
          </Link>
        </div>

        {/* Botón principal */}
        <Link
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-full flex items-center justify-center gap-3 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Abrir Plataforma Infantil</span>
          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
