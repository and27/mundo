"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FaChild,
  FaChartLine,
  FaHeart,
  FaLightbulb,
  FaDownload,
  FaEye,
  FaStar,
} from "react-icons/fa";
import {
  HiSparkles,
  HiTrendingUp,
  HiClock,
  HiEmojiHappy,
  HiChartBar,
} from "react-icons/hi";
import Image from "next/image";

interface MoodEntry {
  day: string;
  emotionName?: string;
  intensity?: number;
  notes?: string;
  color: string;
}

interface ChildSummary {
  id: string;
  name: string;
  avatarUrl?: string;
  lastActivity: string;
  lastActivityDetail?: string;
  recentMoods: MoodEntry[];
  emotionalScore?: number;
  growthTrend?: "up" | "down" | "stable";
  totalActivities?: number;
  favoriteEmotion?: string;
}

const mockChildren: ChildSummary[] = [
  {
    id: "child-1",
    name: "Lucía Exploradora",
    avatarUrl: "/guides/yachay-transparent.png",
    lastActivity: "El Sendero del Puma Valiente",
    lastActivityDetail: "Emoción final: Calma",
    emotionalScore: 85,
    growthTrend: "up",
    totalActivities: 12,
    favoriteEmotion: "Feliz",
    recentMoods: [
      { day: "Lun", color: "#6B7280", emotionName: "Neutral", intensity: 3 },
      { day: "Mar", color: "#F59E0B", emotionName: "Contenta", intensity: 4 },
      { day: "Mié", color: "#3B82F6", emotionName: "Tranquila", intensity: 4 },
      { day: "Jue", color: "#8B5CF6", emotionName: "Curiosa", intensity: 5 },
      { day: "Hoy", color: "#10B981", emotionName: "Feliz", intensity: 5 },
    ],
  },
  {
    id: "child-2",
    name: "Mateo Curioso",
    avatarUrl: "/guides/kuntur-transparent.png",
    lastActivity: "Respiración del Cóndor",
    lastActivityDetail: "Se sintió más relajado",
    emotionalScore: 72,
    growthTrend: "up",
    totalActivities: 8,
    favoriteEmotion: "Concentrado",
    recentMoods: [
      { day: "Mié", color: "#EF4444", emotionName: "Frustrado", intensity: 2 },
      { day: "Jue", color: "#3B82F6", emotionName: "En Paz", intensity: 4 },
      {
        day: "Hoy",
        color: "#1D4ED8",
        emotionName: "Concentrado",
        intensity: 4,
      },
    ],
  },
];

const EmotionalJournalSection = () => {
  const searchParams = useSearchParams();
  const selectedChildId = searchParams.get("childId");
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [showInsights, setShowInsights] = useState(false);

  const childrenToDisplay = selectedChildId
    ? mockChildren.filter((child) => child.id === selectedChildId)
    : mockChildren;

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case "up":
        return (
          <HiTrendingUp
            className="w-4 h-4 text-emerald-600"
            aria-label="Tendencia positiva"
          />
        );
      case "down":
        return (
          <HiTrendingUp
            className="w-4 h-4 text-red-600 rotate-180"
            aria-label="Tendencia negativa"
          />
        );
      default:
        return (
          <HiChartBar
            className="w-4 h-4 text-slate-500"
            aria-label="Tendencia estable"
          />
        );
    }
  };

  const getScoreColor = (score?: number) => {
    if (!score) return "text-slate-600";
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  if (selectedChildId && childrenToDisplay.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <FaChild className="w-6 h-6 text-red-700" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-red-900">
                Explorador no encontrado
              </h2>
              <p className="text-red-700">
                No se encontró información para el explorador seleccionado.
              </p>
            </div>
          </div>
          <Link
            href="/parentDashboard?section=ninos"
            className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-medium py-2.5 px-5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <FaEye className="w-4 h-4" />
            Volver a Mis Exploradores
          </Link>
        </div>
      </div>
    );
  }

  if (mockChildren.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaHeart className="w-8 h-8 text-blue-700" />
          </div>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">
            ¡Comienza el viaje emocional!
          </h2>
          <p className="text-blue-700 mb-6">
            Aún no hay exploradores registrados para ver su bitácora emocional.
          </p>
          <Link
            href="/parentDashboard?section=ninos"
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FaChild className="w-5 h-5" />
            Gestionar Mis Exploradores
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <header className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <FaHeart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Bitácora Emocional
              </h1>
              <p className="text-slate-600">
                {selectedChildId && childrenToDisplay.length === 1
                  ? `Seguimiento de ${childrenToDisplay[0].name}`
                  : `${childrenToDisplay.length} exploradores`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Seleccionar período"
            >
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
              <option value="quarter">Último trimestre</option>
            </select>

            <button
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
              aria-label="Exportar datos"
            >
              <FaDownload className="w-4 h-4" />
              <span className="hidden sm:inline">Exportar</span>
            </button>

            <button
              onClick={() => setShowInsights(!showInsights)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 ${
                showInsights
                  ? "bg-blue-600 text-white focus:ring-blue-500"
                  : "bg-blue-100 hover:bg-blue-200 text-blue-700 focus:ring-blue-500"
              }`}
              aria-label={
                showInsights ? "Ocultar insights" : "Mostrar insights"
              }
            >
              <HiSparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Insights</span>
            </button>
          </div>
        </div>

        {selectedChildId && (
          <Link
            href="/parentDashboard?section=bitacora"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 mt-4 font-medium focus:outline-none focus:underline"
          >
            ← Ver todos los exploradores
          </Link>
        )}
      </header>

      {/* Insights Panel */}
      {showInsights && (
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <HiSparkles className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Insights de Amaru IA
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <FaChartLine className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-slate-900">
                  Progreso General
                </span>
              </div>
              <p className="text-sm text-slate-700">
                Tendencia positiva en bienestar emocional.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <FaHeart className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-slate-900">
                  Emoción Dominante
                </span>
              </div>
              <p className="text-sm text-slate-700">
                Felicidad y curiosidad predominan esta semana.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <FaLightbulb className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-slate-900">
                  Recomendación
                </span>
              </div>
              <p className="text-sm text-slate-700">
                Actividades de expresión creativa potenciarían el crecimiento.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Exploradores */}
      <div className="space-y-6">
        {childrenToDisplay.map((child) => (
          <article
            key={child.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6"
          >
            {/* Header del explorador */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden">
                  {child.avatarUrl ? (
                    <Image
                      src={child.avatarUrl}
                      alt=""
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  ) : (
                    <FaChild className="text-2xl text-slate-500" />
                  )}
                  {child.emotionalScore && child.emotionalScore >= 80 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                      <FaStar className="w-3 h-3 text-amber-800" />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {child.name}
                  </h3>
                  <p className="text-slate-600 text-sm">{child.lastActivity}</p>
                  {child.lastActivityDetail && (
                    <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mt-1">
                      {child.lastActivityDetail}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                {child.emotionalScore && (
                  <div className="text-center">
                    <div
                      className={`text-2xl font-bold ${getScoreColor(
                        child.emotionalScore
                      )}`}
                    >
                      {child.emotionalScore}
                    </div>
                    <div className="text-xs text-slate-500">Bienestar</div>
                  </div>
                )}

                {child.totalActivities && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-700">
                      {child.totalActivities}
                    </div>
                    <div className="text-xs text-slate-500">Actividades</div>
                  </div>
                )}

                {getTrendIcon(child.growthTrend)}

                {!selectedChildId && (
                  <Link
                    href={`/parentDashboard?section=bitacora&childId=${child.id}`}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <FaEye className="w-4 h-4" />
                    <span className="hidden sm:inline">Ver Detalle</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Estado emocional */}
            {child.recentMoods.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <HiEmojiHappy className="w-5 h-5 text-slate-600" />
                    Viaje Emocional Reciente
                  </h4>
                  {child.favoriteEmotion && (
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Favorita: {child.favoriteEmotion}
                    </span>
                  )}
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                    {child.recentMoods.map((mood, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center text-xs text-slate-600 group cursor-help"
                        title={`${mood.day}: ${
                          mood.emotionName || "Sin registro"
                        } ${mood.intensity ? `(${mood.intensity}/5)` : ""}`}
                      >
                        <div
                          className="w-12 h-12 rounded-full mb-2 border-2 border-white shadow-md group-hover:scale-110 transition-transform flex items-center justify-center"
                          style={{ backgroundColor: mood.color }}
                        >
                          {mood.intensity && (
                            <span
                              className="text-white font-bold text-xs"
                              aria-label={`Intensidad ${mood.intensity} de 5`}
                            >
                              {mood.intensity}
                            </span>
                          )}
                        </div>
                        <span className="font-medium">{mood.day}</span>
                        {mood.emotionName && (
                          <span className="text-xs text-slate-500 text-center max-w-16 truncate">
                            {mood.emotionName}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-xl p-6 text-center">
                <HiClock className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600 font-medium">
                  Sin registros emocionales para {child.name}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Los registros aparecerán al completar actividades
                </p>
              </div>
            )}

            {/* Sugerencias (solo en vista detallada) */}
            {selectedChildId && (
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 mt-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiSparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-2">
                      💡 Amaru IA sugiere para {child.name}:
                    </p>
                    <p className="text-sm text-slate-700 mb-3">
                      Considera actividades de{" "}
                      {child.favoriteEmotion?.toLowerCase() || "relajación"} y
                      expresión creativa. Su bienestar es{" "}
                      {child.emotionalScore && child.emotionalScore >= 80
                        ? "excelente"
                        : "bueno"}
                      .
                    </p>
                    <div className="flex gap-2">
                      <span className="bg-white text-slate-700 px-2 py-1 rounded-full text-xs border border-blue-200">
                        🎨 Arte expresivo
                      </span>
                      <span className="bg-white text-slate-700 px-2 py-1 rounded-full text-xs border border-blue-200">
                        🧘 Mindfulness
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Footer */}
      {childrenToDisplay.length > 0 && !selectedChildId && (
        <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaLightbulb className="w-5 h-5 text-amber-600" />
            <span className="font-semibold text-slate-900">
              Consejo de Amaru
            </span>
          </div>
          <p className="text-slate-700 text-sm">
            Para gestión completa de perfiles, visita
            <Link
              href="/parentDashboard?section=ninos"
              className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline"
            >
              Mis Exploradores
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default EmotionalJournalSection;
