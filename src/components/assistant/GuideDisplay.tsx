"use client";

import { useGuideInteraction } from "@/hooks/useGuideInteraction";
import { GuideWithCharacter } from "@/types/ai";
import GuideHeader from "../dashboard/ai/GuideHeader";
import GuideActions from "../dashboard/ai/GuideActionts";
import { MessageCircle, Sparkles, BookOpen } from "lucide-react";
import PillarCard from "./PillarCard";
import {
  ActivityContent,
  ConversationContent,
  MetaphorContent,
} from "./MethaphorContent";
import ExperienceModal from "./ExperienceModal";
import useModalStore from "@/store/useModalStore";

interface GuideDisplayProps {
  guide: GuideWithCharacter | null;
}

export default function GuideDisplay({ guide }: GuideDisplayProps) {
  const { experienceModalOpen, closeExperienceModal } = useModalStore();
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
      title: "La Metáfora",
      subtitle: "Una historia que conecta con su mundo interior",
      gradientFrom: "from-purple-500",
      gradientTo: "to-indigo-600",
      bgAccent: "bg-purple-50",
      borderAccent: "border-blue-200",
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "La Conversación",
      subtitle: "Preguntas y frases para facilitar el diálogo",
      gradientFrom: "from-blue-500",
      gradientTo: "to-cyan-600",
      bgAccent: "bg-blue-50",
      borderAccent: "border-purple-200",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "La Actividad",
      subtitle: "Una experiencia práctica para fortalecer el aprendizaje",
      gradientFrom: "from-green-500",
      gradientTo: "to-emerald-600",
      bgAccent: "bg-green-50",
      borderAccent: "border-green-200",
    },
  ];

  const renderPillarContent = (index: number) => {
    switch (index) {
      case 0:
        return <MetaphorContent guide={guide} />;
      case 1:
        return <ConversationContent guide={guide} />;
      case 2:
        return <ActivityContent guide={guide} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 space-y-6">
      <GuideHeader guide={guide} rating={rating} onRate={handleRatingChange} />
      <GuideActions guide={guide} />

      <div className="space-y-4">
        {pillars.map((pillar, index) => (
          <PillarCard
            key={index}
            pillar={pillar}
            isActive={activePillar === index}
            onClick={() => handlePillarChange(index)}
          >
            {renderPillarContent(index)}
          </PillarCard>
        ))}
      </div>
      <ExperienceModal
        isOpen={experienceModalOpen}
        onClose={closeExperienceModal}
        guide={guide}
      />
    </div>
  );
}
