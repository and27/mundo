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
  Play,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";

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
          character: guide.characterId,
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
      <div className="">
        <Button
          onClick={handleStartExperience}
          disabled={loading}
          className="flex items-center gap-5"
        >
          <Play size="16" />
          {loading ? "Generando..." : "Escuchar cuento"}
        </Button>
      </div>
      <div className="flex items-start gap-3 border border-primary-200 p-5">
        <p className="text-sm md:text-md text-neutral-700 leading-relaxed flex-1">
          {guide.metaphorStory ?? "Contenido no disponible."}
        </p>
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
        <div className="border border-primary-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
              <Target className="w-3 h-3 text-primary-400" />
            </div>
            <h4 className="font-semibold text-slate-800">
              Preguntas para Explorar
            </h4>
          </div>
          <div className="space-y-2">
            {guide.conversationPlan.questionsToExplore.map((q, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-700">{q}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {guide.conversationPlan?.phrasesToValidate?.length > 0 && (
        <div className="border border-primary-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
              <Heart className="w-3 h-3 text-primary-600" />
            </div>
            <h4 className="font-semibold text-slate-800">
              Frases para Validar
            </h4>
          </div>
          <div className="space-y-2">
            {guide.conversationPlan.phrasesToValidate.map((p, i) => (
              <div
                key={i}
                className="bg-white/70 rounded-lg p-3 border border-primary-200"
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
    <div className="mt-5 space-y-4">
      <div className="border border-primary-200 rounded-xl p-4">
        <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
          <Star className="w-4 h-4" />
          {guide.suggestedActivity?.title ?? "Actividad Sugerida"}
        </h4>
        <p className="text-slate-700 mb-4 leading-relaxed">
          {guide.suggestedActivity?.description ?? ""}
        </p>

        <div className="bg-white/70 rounded-lg p-3 border border-primary-200">
          <p className="text-sm">
            <span className="font-semibold text-slate-800 flex items-center gap-2 mb-2">
              <Users className="w-4 h-4" />
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
