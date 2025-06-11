"use client";

import { useGuideInteraction } from "@/hooks/useGuideInteraction";
import { ActionableGuide } from "@/types/ai";
import GuideHeader from "../dashboard/ai/GuideHeader";
import GuideActions from "../dashboard/ai/GuideActionts";
import {
  MessageCircle,
  Sparkles,
  Heart,
  BookOpen,
  Users,
  Target,
  CheckCircle,
  Star,
} from "lucide-react";

interface GuideDisplayProps {
  guide: ActionableGuide | null;
}

export default function GuideDisplay({ guide }: GuideDisplayProps) {
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
                Creando tu guía personalizada...
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
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 leading-relaxed">
            {guide.metaphorStory ?? "Contenido no disponible."}
          </p>
        </div>
      ),
      gradientFrom: "from-blue-500",
      gradientTo: "to-cyan-600",
      bgAccent: "bg-blue-50",
      borderAccent: "border-blue-200",
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "La Conversación",
      subtitle: "Preguntas y frases para facilitar el diálogo",
      content: (
        <div className="space-y-6">
          {guide.conversationPlan?.questionsToExplore?.length > 0 && (
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <Target className="w-3 h-3 text-purple-600" />
                </div>
                <h4 className="font-semibold text-slate-800">
                  Preguntas para Explorar
                </h4>
              </div>
              <div className="space-y-2">
                {guide.conversationPlan.questionsToExplore.map((q, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-700">{q}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {guide.conversationPlan?.phrasesToValidate?.length > 0 && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Heart className="w-3 h-3 text-indigo-600" />
                </div>
                <h4 className="font-semibold text-slate-800">
                  Frases para Validar
                </h4>
              </div>
              <div className="space-y-2">
                {guide.conversationPlan.phrasesToValidate.map((p, i) => (
                  <div
                    key={i}
                    className="bg-white/70 rounded-lg p-3 border border-indigo-100"
                  >
                    <p className="text-sm text-slate-700 italic">{`"{p}"`}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ),
      gradientFrom: "from-purple-500",
      gradientTo: "to-indigo-600",
      bgAccent: "bg-purple-50",
      borderAccent: "border-purple-200",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "La Actividad",
      subtitle: "Una experiencia práctica para fortalecer el aprendizaje",
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
              <Star className="w-4 h-4 text-green-600" />
              {guide.suggestedActivity?.title ?? "Actividad Sugerida"}
            </h4>
            <p className="text-slate-700 mb-4 leading-relaxed">
              {guide.suggestedActivity?.description ?? ""}
            </p>

            <div className="bg-white/70 rounded-lg p-3 border border-green-100">
              <p className="text-sm">
                <span className="font-semibold text-slate-800 flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-green-600" />
                  Materiales necesarios:
                </span>
                <span className="text-slate-700">
                  {guide.suggestedActivity?.materials ?? "No especificados."}
                </span>
              </p>
            </div>
          </div>
        </div>
      ),
      gradientFrom: "from-green-500",
      gradientTo: "to-emerald-600",
      bgAccent: "bg-green-50",
      borderAccent: "border-green-200",
    },
  ];

  return (
    <>
      <div className="max-w-4xl mx-auto mt-20 space-y-6">
        <GuideHeader
          guide={guide}
          rating={rating}
          onRate={handleRatingChange}
        />
        <GuideActions guide={guide} />

        <div className="space-y-4">
          {pillars.map((pillar, index) => (
            <div key={index} className="group">
              <div
                className={`bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                  activePillar === index
                    ? `${pillar.borderAccent} shadow-xl scale-[1.01]`
                    : "hover:border-indigo-200 hover:shadow-lg"
                }`}
                onClick={() => handlePillarChange(index)}
              >
                {/* Header del pilar */}
                <div
                  className={`p-6 ${
                    activePillar === index ? pillar.bgAccent : "bg-white/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${pillar.gradientFrom} ${pillar.gradientTo} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <div className="text-white">{pillar.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800 mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {pillar.subtitle}
                      </p>
                    </div>
                    <div
                      className={`transition-transform duration-300 ${
                        activePillar === index ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        className="w-5 h-5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Contenido expandible */}
                {activePillar === index && (
                  <div className="p-6 pt-0 animate-in slide-in-from-top-2 duration-300">
                    <div className="border-t border-slate-200 pt-6">
                      {pillar.content}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
