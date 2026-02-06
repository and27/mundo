"use client";

import { useGuideInteraction } from "@/hooks/useGuideInteraction";
import { GuideWithCharacter } from "@/types/ai";
import GuideHeader from "../dashboard/ai/GuideHeader";
import { MessageCircle, Sparkles, BookOpen, Loader2 } from "lucide-react";
import PillarCard from "./PillarCard";
import {
  ActivityContent,
  ConversationContent,
  MetaphorContent,
} from "./MethaphorContent";
import { useState } from "react";
import ChipTabs from "../ui/ChipTabs";

interface GuideDisplayProps {
  guide: GuideWithCharacter | null;
}

export default function GuideDisplay({ guide }: GuideDisplayProps) {
  const [loading, setLoading] = useState(false);
  const { activePillar, rating, handlePillarChange, handleRatingChange } =
    useGuideInteraction();

  if (!guide) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/90 backdrop-blur-[20px] saturate-[180%] border border-white/10 rounded-3xl p-8 shadow-lg">
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white animate-spin" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-1">
                Creando tu cuento personalizado...
              </h3>
              <p className="text-sm text-slate-600">
                Estamos procesando tu consulta con la metodología MIM
              </p>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const pillars = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "El cuento",
      subtitle: "Una historia que conecta con su mundo interior",
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Acompañamiento",
      subtitle: "Guia para padres: conversacion y actividad",
    },
  ];

  const renderPillarContent = (index: number) => {
    switch (index) {
      case 0:
        return (
          <MetaphorContent
            guide={guide}
            loading={loading}
            setLoading={setLoading}
          />
        );
      case 1:
        return (
          <>
            <ConversationContent guide={guide} />
            <ActivityContent guide={guide} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mi-stack-md">
      {loading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-[20px] border border-white/20 rounded-3xl p-8 shadow-2xl max-w-sm mx-4">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="absolute inset-0 rounded-2xl animate-ping opacity-20"></div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Creando experiencia
              </h3>
              <p className="text-slate-600 mb-6">
                Generando tu historia personalizada...
              </p>

              <div className="flex items-center justify-center gap-2 mb-4">
                <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
                <span className="text-sm text-slate-500">Cargando ...</span>
              </div>

              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <GuideHeader guide={guide} rating={rating} onRate={handleRatingChange} />

      <ChipTabs
        tabs={pillars.map((pillar, index) => ({
          id: String(index),
          label: pillar.title,
        }))}
        activeTab={String(activePillar)}
        onTabChange={(tabId) => handlePillarChange(Number(tabId))}
      />

      {/* --- Active Pillar Card --- */}
      <div className="transition-all duration-500 ease-in-out">
        <PillarCard
          pillar={pillars[activePillar]}
          isActive={true}
          onClick={() => {}}
        >
          {renderPillarContent(activePillar)}
        </PillarCard>
      </div>
    </div>
  );
}
