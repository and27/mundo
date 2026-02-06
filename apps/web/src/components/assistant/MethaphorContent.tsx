import React from "react";
import { GuideWithCharacter } from "@/types/ai";
import { Target, CheckCircle, Heart, Star, Users, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import type { ParentGuideSection } from "@/types/ai";
import { getGuideSections } from "@/lib/guideSections";
import { toast } from "sonner";
import { authFetch } from "@/lib/authFetch";
import type { StoryJob, StoryJobCreateResponse } from "@/types/storyJob";
import { inferGuideContext } from "@/lib/guideInference";

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
  const sections = getGuideSections(guide);
  const metaphorSection = sections.find(
    (section) => section.kind === "metaphor",
  ) as ParentGuideSection | undefined;
  const metaphorContent =
    metaphorSection && "content" in metaphorSection
      ? metaphorSection.content
      : undefined;

  const sleep = (ms: number) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  const pollStoryJob = async (jobId: string): Promise<StoryJob> => {
    const timeoutMs = 10 * 60 * 1000;
    const intervalMs = 2000;
    const start = Date.now();

    while (Date.now() - start < timeoutMs) {
      const statusRes = await authFetch(`/api/story/export/${jobId}`, {
        method: "GET",
      });

      if (statusRes.status === 404) {
        await sleep(intervalMs);
        continue;
      }

      if (!statusRes.ok) {
        const errText = await statusRes.text();
        throw new Error(errText || "Error consultando estado del job.");
      }

      const job = (await statusRes.json()) as StoryJob;
      if (job.status === "succeeded" || job.status === "failed") {
        return job;
      }

      await sleep(intervalMs);
    }

    throw new Error("Tiempo de espera agotado para generar la historia.");
  };

  const handleStartExperience = async () => {
    if (!setLoading) return;
    try {
      setLoading(true);
      if (guide.storyId) {
        router.push(`/cuentos/${guide.storyId}`);
        return;
      }
      const inference = inferGuideContext(guide);
      const emotionId = inference.emotionId;
      const characterId = inference.characterId;
      if (inference.emotionSource === "fallback") {
        console.warn(
          "[story/export] Guide missing emotionId; defaulting to 'miedo'",
          guide
        );
      }
      console.log(
        "[story/export] Inferred emotion:",
        emotionId,
        inference.emotionSource
      );
      console.log(
        "[story/export] Inferred character:",
        characterId,
        inference.characterSource
      );
      const res = await authFetch("/api/story/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emotion: emotionId,
          character: characterId,
        }),
      });

      if (res.status === 202) {
        const jobData = (await res.json()) as StoryJobCreateResponse;
        await authFetch(jobData.processUrl, { method: "POST" });
        const job = await pollStoryJob(jobData.jobId);

        if (job.status === "failed") {
          throw new Error(job.error ?? "Fallo generando la historia.");
        }

        if (!job.result?.storyId) {
          throw new Error("Job completado sin storyId.");
        }

        router.push(`/cuentos/${job.result.storyId}`);
        return;
      }

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      const data = await res.json();
      if (data.cached) {
        console.log("?? Historia reutilizada desde cach‚:", data.url);
      } else {
        console.log("? Historia generada nueva:", data.story.id);
      }

      router.push(`/cuentos/${data.story.id}`);
    } catch (err) {
      console.error("Error generando experiencia digital", err);
      toast.error("Ocurrio un error generando la historia.");
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
          {metaphorContent ?? "Contenido no disponible."}
        </p>
      </div>
    </div>
  );
};

// CONVERSATION CONTENT
export const ConversationContent: React.FC<PillarContentProps> = ({
  guide,
}) => {
  const sections = getGuideSections(guide);
  const languageSection = sections.find(
    (section) => section.kind === "language",
  ) as ParentGuideSection | undefined;
  const questions =
    languageSection && "questions" in languageSection
      ? (languageSection.questions ?? [])
      : [];
  const phrases =
    languageSection && "phrases" in languageSection
      ? (languageSection.phrases ?? [])
      : [];
  return (
    <div className="space-y-6">
      {questions.length > 0 && (
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
            {questions.map((q, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-700">{q}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {phrases.length > 0 && (
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
            {phrases.map((p, i) => (
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
  const sections = getGuideSections(guide);
  const practiceSection = sections.find(
    (section) => section.kind === "practice",
  ) as ParentGuideSection | undefined;
  const activityTitle =
    practiceSection && "title" in practiceSection
      ? practiceSection.title
      : undefined;
  const activityDescription =
    practiceSection && "description" in practiceSection
      ? practiceSection.description
      : undefined;
  const activityMaterials =
    practiceSection && "materials" in practiceSection
      ? practiceSection.materials
      : undefined;
  return (
    <div className="mt-5 space-y-4">
      <div className="border border-primary-200 rounded-xl p-4">
        <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
          <Star className="w-4 h-4" />
          {activityTitle ?? "Actividad Sugerida"}
        </h4>
        <p className="text-slate-700 mb-4 leading-relaxed">
          {activityDescription ?? ""}
        </p>

        <div className="bg-white/70 rounded-lg p-3 border border-primary-200">
          <p className="text-sm">
            <span className="font-semibold text-slate-800 flex items-center gap-2 mb-2">
              <Users className="w-4 h-4" />
              Materiales necesarios:
            </span>
            <span className="text-slate-700">
              {activityMaterials ?? "No especificados."}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
