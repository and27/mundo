"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronRight, ArrowLeft, Calendar } from "lucide-react";
import { useSavedGuides } from "@/hooks/useSavedGuides";
import GuideDisplay from "../assistant/GuideDisplay";
import StoryCard from "./StoryCard";
import { authFetch } from "@/lib/authFetch";
import type { StoryJob } from "@/types/storyJob";
import type { GuideWithCharacter } from "@/types/ai";
import { inferGuideContext } from "@/lib/guideInference";

export default function GeneratedStories() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const guideIdFromUrl = searchParams.get("guideId");
  const jobIdFromUrl = searchParams.get("jobId");
  const newStoryQuery = searchParams.get("newStoryQuery");

  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(
    guideIdFromUrl
  );
  const [job, setJob] = useState<StoryJob | null>(null);
  const [jobError, setJobError] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [queryStartMs, setQueryStartMs] = useState<number | null>(null);
  const {
    savedGuides,
    createdAtById,
    isLoaded,
    deleteGuide,
    getGuide,
    saveGuide,
  } = useSavedGuides();

  useEffect(() => {
    if (jobIdFromUrl || newStoryQuery) {
      if (selectedGuideId !== null) setSelectedGuideId(null);
      return;
    }
    if (guideIdFromUrl && guideIdFromUrl !== selectedGuideId) {
      setSelectedGuideId(guideIdFromUrl);
    }
  }, [guideIdFromUrl, jobIdFromUrl, newStoryQuery, selectedGuideId]);

  useEffect(() => {
    if (!jobIdFromUrl) {
      setJob(null);
      setJobError(null);
      return;
    }

    let isActive = true;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const fetchJob = async () => {
      try {
        const res = await authFetch(`/api/story/export/${jobIdFromUrl}`, {
          method: "GET",
        });
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText || "No se pudo cargar el job.");
        }
        const data = (await res.json()) as StoryJob;
        if (!isActive) return;
        setJob(data);
        if (data.status === "succeeded" || data.status === "cancelled") {
          if (intervalId) clearInterval(intervalId);
        }
      } catch (err) {
        if (!isActive) return;
        const message = err instanceof Error ? err.message : "Error desconocido.";
        setJobError(message);
      }
    };

    fetchJob();
    intervalId = setInterval(fetchJob, 7000);

    return () => {
      isActive = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [jobIdFromUrl]);

  useEffect(() => {
    if (!newStoryQuery) return;
    let isActive = true;
    if (!queryStartMs) {
      setQueryStartMs(Date.now());
    }

    const createFromQuery = async () => {
      try {
        const res = await authFetch("/api/generate-guide", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: decodeURIComponent(newStoryQuery),
            useOpenAI: true,
          }),
        });
        if (!res.ok) {
          let errMessage = "No se pudo generar la guía.";
          try {
            const errJson = (await res.json()) as { error?: string };
            if (errJson?.error) errMessage = errJson.error;
          } catch {
            const errText = await res.text();
            if (errText) errMessage = errText;
          }
          throw new Error(errMessage);
        }
        const rawGuide = (await res.json()) as GuideWithCharacter;
        const inference = inferGuideContext(rawGuide);
        const guide: GuideWithCharacter = {
          ...rawGuide,
          emotionId: inference.emotionId,
          characterId: inference.characterId,
        };
        const savedId = await saveGuide(guide);

        const jobRes = await authFetch("/api/story/export", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            emotion: guide.emotionId,
            character: guide.characterId,
          }),
        });
        if (!jobRes.ok) {
          let errMessage = "No se pudo iniciar el cuento.";
          try {
            const errJson = (await jobRes.json()) as { error?: string };
            if (errJson?.error) errMessage = errJson.error;
          } catch {
            const errText = await jobRes.text();
            if (errText) errMessage = errText;
          }
          throw new Error(errMessage);
        }
        const jobData = (await jobRes.json()) as { jobId: string };
        if (!isActive) return;

        setJobError(null);
        router.replace(
          `/parentDashboard?section=guides&guideId=${savedId}&jobId=${jobData.jobId}`
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : "Error desconocido.";
        setJobError(message);
        router.replace("/parentDashboard?section=guides");
      }
    };

    createFromQuery();

    return () => {
      isActive = false;
    };
  }, [newStoryQuery, saveGuide, router, queryStartMs]);

  useEffect(() => {
    if (
      !jobIdFromUrl ||
      !job ||
      job.status !== "succeeded" ||
      !job.result?.storyId ||
      !guideIdFromUrl
    ) {
      return;
    }

    const guide = getGuide(guideIdFromUrl);
    if (!guide || guide.storyId === job.result.storyId) {
      return;
    }

    const updatedGuide = {
      ...guide,
      storyId: job.result.storyId,
      storyUrl: job.result.url,
    };

    void saveGuide(updatedGuide).catch((err) => {
      console.error("Error updating guide with storyId:", err);
    });
  }, [guideIdFromUrl, job, jobIdFromUrl, getGuide, saveGuide]);

  useEffect(() => {
    if (!jobIdFromUrl) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [jobIdFromUrl]);

  const progress = useMemo(() => {
    if (!jobIdFromUrl && !newStoryQuery) return 0;
    if (job?.status && job.status !== "queued" && job.status !== "running") {
      return 100;
    }
    if (job?.progress && job.progress.total > 0) {
      return Math.min(
        100,
        Math.round((job.progress.completed / job.progress.total) * 100)
      );
    }
    const estimateMs = getStoryEstimateMs();
    const createdAtMs = job?.createdAt
      ? new Date(job.createdAt).getTime()
      : queryStartMs ?? now;
    const elapsed = Math.max(0, now - createdAtMs);
    return Math.min(100, Math.round((elapsed / estimateMs) * 100));
  }, [job?.createdAt, jobIdFromUrl, newStoryQuery, now, queryStartMs, job?.progress, job?.status]);

  const handleCancelJob = async () => {
    if (!jobIdFromUrl) return;
    try {
      const res = await authFetch(
        `/api/story/export/${jobIdFromUrl}/cancel`,
        { method: "POST" }
      );
      if (res.ok) {
        setJob((prev) => (prev ? { ...prev, status: "cancelled" } : prev));
        router.replace("/parentDashboard?section=guides");
      }
    } catch (err) {
      console.error("Error cancelling story job:", err);
    }
  };

  if (selectedGuideId) {
    const currentGuide = getGuide(selectedGuideId);
    if (!currentGuide) {
      setSelectedGuideId(null);
      return null;
    }

    return (
      <div className="max-w-5xl px-4 md:px-20 mi-stack-md">
        <div className="mi-section-header flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-sm text-neutral-500">
            <button
              onClick={() => setSelectedGuideId(null)}
              className="flex items-center gap-1 hover:text-neutral-800 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Biblioteca
            </button>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
            <span className="text-neutral-800 font-medium line-clamp-1">
              {currentGuide.guideTitle}
            </span>
          </nav>

        </div>

        <GuideDisplay guide={currentGuide} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl px-5 md:px-20 mi-stack-md">
      <div className="mi-section-header">
        <h1 className="text-xl md:text-3xl tracking-tight font-extrabold text-neutral-800 mi-section-title">
          {"Tu biblioteca de cuentos"}
        </h1>
        <p className="text-neutral-600">
          Accede a todos los cuentos emocionales que has creado (
          {savedGuides.length})
        </p>
      </div>

      {(jobIdFromUrl || newStoryQuery) && (
        <div className="border border-neutral-200 rounded-2xl p-5 mi-stack-md bg-white shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-neutral-500">
                Nuevo cuento en preparación
              </p>
              <h3 className="text-lg font-semibold text-neutral-800">
                Cocinando tu cuento personalizado
              </h3>
              <p className="text-sm text-neutral-600">
                Tiempo estimado: {formatEstimateMinutes(getStoryEstimateMs())}
              </p>
            </div>
            {(job?.status === "queued" ||
              job?.status === "running" ||
              newStoryQuery) && (
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700" />
            )}
          </div>

          <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
            <div
              className="h-full bg-neutral-900 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          {job?.status === "succeeded" && job.result?.storyId ? (
            <button
              onClick={() => router.push(`/cuentos/${job.result?.storyId}`)}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5 bg-primary-600 hover:bg-primary-700"
            >
              Escuchar cuento
            </button>
          ) : jobError && !job ? (
            <div className="mi-stack-sm">
              <p className="text-sm text-red-500">{jobError}</p>
              <button
                onClick={() => router.replace("/parentDashboard?section=guides")}
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 transition"
              >
                Volver
              </button>
            </div>
          ) : job?.status === "failed" ? (
            <p className="text-sm text-red-500">
              {job.error ?? jobError ?? "No se pudo generar el cuento."}
            </p>
          ) : job?.status === "cancelled" ? (
            <p className="text-sm text-neutral-500">
              Creación cancelada. Puedes iniciar un nuevo cuento cuando quieras.
            </p>
          ) : (
            <button
              onClick={handleCancelJob}
              className="px-4 py-2 rounded-xl text-sm font-semibold border border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 transition"
            >
              Cancelar
            </button>
          )}
        </div>
      )}

      {!isLoaded && (
        <div className="flex items-center justify-center py-10">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700" />
        </div>
      )}

      {savedGuides.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {savedGuides.map((guide, index) => (
            <StoryCard
              key={`${guide.id}-${index}`}
              guide={guide}
              variant="parent"
              onPlay={() => setSelectedGuideId(guide.id)}
              onDelete={() => {
                deleteGuide(guide.id);
                if (selectedGuideId === guide.id) {
                  setSelectedGuideId(null);
                }
              }}
              createdAt={createdAtById[guide.id] || "Generada en la nube"}
            />
          ))}
        </div>
      ) : (
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl py-16 px-6 text-center mi-stack-md">
          <div className="w-16 h-16 mx-auto rounded-full bg-neutral-100 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-800">
            Aún no tienes cuentos guardados
          </h3>
          <p className="text-neutral-600 max-w-md mx-auto">
            Cuando generes tu primera guía emocional, se guardará
            automáticamente aquí para que puedas acceder a ella cuando la
            necesites.
          </p>
        </div>
      )}
    </div>
  );
}

function getStoryEstimateMs() {
  const raw = process.env.NEXT_PUBLIC_STORY_ESTIMATE_MS;
  if (!raw) return 2 * 60 * 1000;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 2 * 60 * 1000;
}

function formatEstimateMinutes(ms: number) {
  const minutes = Math.max(1, Math.round(ms / 60000));
  return `${minutes} minutos`;
}
