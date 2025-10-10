import React from "react";
import { GuideWithCharacter } from "@/types/ai";
import {
  Target,
  CheckCircle,
  Heart,
  Star,
  Users,
  Info,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface PillarContentProps {
  guide: GuideWithCharacter;
  loading?: boolean;
  setLoading?: (loading: boolean) => void;
}

export const MetaphorContent: React.FC<PillarContentProps> = ({
  guide,
  loading = false,
  setLoading,
}) => {
  const router = useRouter();
  const handleStartExperience = async () => {
    if (!setLoading) return;
    try {
      setLoading(true);
      const res = await fetch("/api/story/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emotion: guide.emotion,
          character: guide.character,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      const data = await res.json();
      if (data.cached) {
        console.log("♻️ Historia reutilizada desde caché:", data.url);
      } else {
        console.log("✨ Historia generada nueva:", data.story.id);
      }

      router.push(`/cuentos/${data.story.id}`);
    } catch (err) {
      console.error("Error generando experiencia digital", err);
      alert("Ocurrió un error generando la historia.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <p className="text-slate-700 leading-relaxed flex-1">
          {guide.metaphorStory ?? "Contenido no disponible."}
        </p>

        <div className="group relative flex-shrink-0">
          <button className="w-6 h-6 bg-amber-100 hover:bg-amber-200 rounded-full flex items-center justify-center transition-colors">
            <Info className="w-3.5 h-3.5 text-amber-600" />
          </button>

          {/* Tooltip más grande */}
          <div className="absolute right-0 top-8 w-80 bg-slate-800 text-white text-sm rounded-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
            <div className="absolute -top-2 right-3 w-4 h-4 bg-slate-800 rotate-45"></div>
            <div className="space-y-2">
              <div className="font-medium text-amber-200">
                Inspiración Andina
              </div>
              <div className="leading-relaxed">
                Esta narrativa se inspira en la tradición oral andina, donde los
                cuentos transmiten enseñanzas profundas sobre el equilibrio
                emocional y la conexión con la naturaleza.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200">
        <button
          onClick={handleStartExperience}
          disabled={loading}
          className={`w-full px-4 py-3 rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center gap-2 font-medium ${
            loading
              ? "bg-slate-300 text-slate-500 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
          }`}
        >
          <Sparkles className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Generando..." : "Explorar Versión Completa"}
        </button>
      </div>
    </div>
  );
};

// CONVERSATION CONTENT
export const ConversationContent: React.FC<PillarContentProps> = ({
  guide,
}) => {
  return (
    <div className="space-y-6">
      {guide.conversationPlan?.questionsToExplore?.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <Target className="w-3 h-3 text-blue-600" />
            </div>
            <h4 className="font-semibold text-slate-800">
              Preguntas para Explorar
            </h4>
          </div>
          <div className="space-y-2">
            {guide.conversationPlan.questionsToExplore.map((q, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
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
                <p className="text-sm text-slate-700 italic">{`"${p}"`}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ACTIVITY CONTENT
export const ActivityContent: React.FC<PillarContentProps> = ({ guide }) => {
  return (
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
  );
};
