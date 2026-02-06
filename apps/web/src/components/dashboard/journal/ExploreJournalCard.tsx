"use client";
import {
  User,
  Star,
  TrendingUp,
  BarChart3,
  Smile,
  Eye,
  Brain,
  Palette,
  Heart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MoodEntry, MoodTimeline } from "./MoodTimeline";

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

interface ExplorerJournalCardProps {
  child: ChildSummary;
  isDetailView?: boolean;
}

export function ExplorerJournalCard({
  child,
  isDetailView = false,
}: ExplorerJournalCardProps) {
  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case "down":
        return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default:
        return <BarChart3 className="w-4 h-4 text-slate-500" />;
    }
  };

  const getScoreColor = (score?: number) => {
    if (!score) return "text-slate-600";
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <article className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
      {/* Header del explorador */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center overflow-hidden border-2 border-white shadow-lg">
            {child.avatarUrl ? (
              <Image
                src={child.avatarUrl}
                alt={`Avatar de ${child.name}`}
                width={64}
                height={64}
                className="object-contain"
              />
            ) : (
              <User className="w-8 h-8 text-indigo-600" />
            )}
            {child.emotionalScore && child.emotionalScore >= 80 && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-3 h-3 text-amber-900" />
              </div>
            )}
          </div>

          <div>
            <h3 className="mi-text-subtitle text-slate-800">{child.name}</h3>
            <p className="mi-text-body-sm text-slate-600 font-medium">
              {child.lastActivity}
            </p>
            {child.lastActivityDetail && (
              <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs mt-1 font-medium">
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
              <div className="mi-text-caption text-slate-500 font-medium">
                Bienestar
              </div>
            </div>
          )}

          {child.totalActivities && (
            <div className="text-center">
              <div className="mi-text-subtitle text-slate-700">
                {child.totalActivities}
              </div>
              <div className="mi-text-caption text-slate-500 font-medium">Viajes</div>
            </div>
          )}

          <div className="p-2 bg-slate-100 rounded-lg">
            {getTrendIcon(child.growthTrend)}
          </div>

          {!isDetailView && (
            <Link
              href={`/parentDashboard?section=bitacora&childId=${child.id}`}
              className="group flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Ver Detalle</span>
            </Link>
          )}
        </div>
      </div>

      {/* Timeline emocional */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Smile className="w-5 h-5 text-slate-600" />
            Viaje Emocional Reciente
          </h4>
          {child.favoriteEmotion && (
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
              Favorita: {child.favoriteEmotion}
            </span>
          )}
        </div>

        <MoodTimeline moods={child.recentMoods} childName={child.name} />
      </div>

      {/* Sugerencias (solo en vista detallada) */}
      {isDetailView && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mt-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-green-900 mb-2">
                💡 Mundo Interior IA sugiere para {child.name}:
              </p>
              <p className="mi-text-body-sm text-slate-700 mb-3 leading-relaxed">
                Considera narrativas andinas de{" "}
                {child.favoriteEmotion?.toLowerCase() || "calma"} y expresión
                creativa. Su bienestar emocional es{" "}
                {child.emotionalScore && child.emotionalScore >= 80
                  ? "excelente"
                  : "muy bueno"}
                .
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-white/80 text-slate-700 px-3 py-1.5 rounded-full text-xs border border-green-200 flex items-center gap-1">
                  <Palette className="w-3 h-3" />
                  Arte expresivo
                </span>
                <span className="bg-white/80 text-slate-700 px-3 py-1.5 rounded-full text-xs border border-green-200 flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  Mindfulness andino
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

