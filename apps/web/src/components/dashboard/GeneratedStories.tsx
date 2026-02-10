"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSavedGuides } from "@/hooks/useSavedGuides";
import StoryCookingCard from "./StoryCookingCard";
import StoryGuideDetail from "./StoryGuideDetail";
import StoryGrid from "./StoryGrid";
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
  const newStoryEmotion = searchParams.get("newStoryEmotion");

  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(
    guideIdFromUrl,
  );
  const [job, setJob] = useState<StoryJob | null>(null);
  const [jobError, setJobError] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [queryStartMs, setQueryStartMs] = useState<number | null>(null);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [lastCreatedGuideId, setLastCreatedGuideId] = useState<string | null>(
    null,
  );
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);
  const [createEpoch, setCreateEpoch] = useState(0);
  const [needsEmotionSelection, setNeedsEmotionSelection] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const lastSubmitKeyRef = useRef<string | null>(null);
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
    const effectiveJobId = jobIdFromUrl ?? activeJobId;
    if (!effectiveJobId) {
      setJob(null);
      setJobError(null);
      return;
    }

    let isActive = true;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const fetchJob = async () => {
      try {
        const res = await authFetch(`/api/story/export/${effectiveJobId}`, {
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
        const message =
          err instanceof Error ? err.message : "Error desconocido.";
        setJobError(message);
      }
    };

    fetchJob();
    intervalId = setInterval(fetchJob, 7000);

    return () => {
      isActive = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [jobIdFromUrl, activeJobId]);

  useEffect(() => {
    if (!jobIdFromUrl && !activeJobId && !newStoryQuery) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [jobIdFromUrl, activeJobId, newStoryQuery]);

  useEffect(() => {
    if (!newStoryQuery) {
      setPendingQuery(null);
      setNeedsEmotionSelection(false);
      setSelectedEmotion(null);
      setActiveJobId(null);
      return;
    }

    setPendingQuery(decodeURIComponent(newStoryQuery));
    if (newStoryEmotion) {
      setSelectedEmotion(newStoryEmotion);
      setNeedsEmotionSelection(false);
    } else {
      setNeedsEmotionSelection(false);
      setSelectedEmotion(null);
    }
    setJobError(null);
    setQueryStartMs(Date.now());
    setCreateEpoch((prev) => prev + 1);
  }, [newStoryQuery, newStoryEmotion]);

  useEffect(() => {
    if (!newStoryQuery) return;
    if (!lastCreatedGuideId) return;
    if (jobIdFromUrl || activeJobId) return;
    router.replace(
      `/parentDashboard?section=guides&guideId=${lastCreatedGuideId}`,
    );
  }, [newStoryQuery, lastCreatedGuideId, jobIdFromUrl, activeJobId, router]);

  useEffect(() => {
    if (!pendingQuery) return;
    if (needsEmotionSelection && !selectedEmotion) return;

    let isActive = true;
    const submitKey = `${pendingQuery}::${selectedEmotion ?? "none"}::${createEpoch}`;
    if (lastSubmitKeyRef.current === submitKey) {
      return () => {
        isActive = false;
      };
    }
    lastSubmitKeyRef.current = submitKey;

    const createFromQuery = async () => {
      try {
        const res = await authFetch("/api/generate-guide", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: pendingQuery,
            useOpenAI: true,
            emotionId: selectedEmotion ?? undefined,
          }),
        });
        if (!res.ok) {
          let errMessage = "No se pudo generar la guía.";
          let requiresEmotionSelection = false;
          try {
            const errJson = (await res.json()) as {
              error?: string;
              requiresEmotionSelection?: boolean;
            };
            if (errJson?.error) errMessage = errJson.error;
            if (errJson?.requiresEmotionSelection) {
              requiresEmotionSelection = true;
            }
          } catch {
            const errText = await res.text();
            if (errText) errMessage = errText;
          }
          if (requiresEmotionSelection) {
            setNeedsEmotionSelection(true);
            setJobError(errMessage);
            return;
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
        setLastCreatedGuideId(savedId);

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

        setActiveJobId(jobData.jobId);
        setNeedsEmotionSelection(false);
        setJobError(null);
        router.replace(
          `/parentDashboard?section=guides&guideId=${savedId}&jobId=${jobData.jobId}`,
        );
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error desconocido.";
        setJobError(message);
        router.replace("/parentDashboard?section=guides");
      }
    };

    createFromQuery();

    return () => {
      isActive = false;
    };
  }, [
    pendingQuery,
    selectedEmotion,
    needsEmotionSelection,
    createEpoch,
    saveGuide,
    router,
  ]);

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

  const progress = useMemo(() => {
    if (!jobIdFromUrl && !activeJobId && !newStoryQuery) return 0;
    if (job?.status === "succeeded") return 100;
    if (job?.progress && job.progress.total > 0) {
      return Math.min(
        100,
        Math.round((job.progress.completed / job.progress.total) * 100),
      );
    }
    const estimateMs = getStoryEstimateMs();
    const createdAtMs = job?.createdAt
      ? new Date(job.createdAt).getTime()
      : (queryStartMs ?? now);
    const elapsed = Math.max(0, now - createdAtMs);
    return Math.max(5, Math.min(100, Math.round((elapsed / estimateMs) * 100)));
  }, [
    job?.createdAt,
    jobIdFromUrl,
    activeJobId,
    newStoryQuery,
    now,
    queryStartMs,
    job?.progress,
    job?.status,
  ]);

  const latestGuideId = useMemo(() => {
    if (!savedGuides.length) return null;
    return savedGuides[0].id;
  }, [savedGuides]);

  const handlePlayGuide = useCallback((guideId: string) => {
    setSelectedGuideId(guideId);
  }, []);

  const handleDeleteGuide = useCallback(
    (guideId: string) => {
      deleteGuide(guideId);
      if (selectedGuideId === guideId) {
        setSelectedGuideId(null);
      }
    },
    [deleteGuide, selectedGuideId]
  );

  const handleCancelJob = async () => {
    const effectiveJobId = jobIdFromUrl ?? activeJobId;
    if (!effectiveJobId) return;
    try {
      const res = await authFetch(
        `/api/story/export/${effectiveJobId}/cancel`,
        { method: "POST" },
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
      <StoryGuideDetail
        guide={currentGuide}
        onBack={() => {
          setSelectedGuideId(null);
          router.replace("/parentDashboard?section=guides");
        }}
      />
    );
  }

  return (
    <div className="px-5 md:px-20 mi-stack-md">
      {(jobIdFromUrl || activeJobId || newStoryQuery) && (
        <StoryCookingCard
          job={job}
          jobError={jobError}
          progress={progress}
          needsEmotionSelection={needsEmotionSelection}
          selectedEmotion={selectedEmotion}
          showSpinner={
            job?.status === "queued" ||
            job?.status === "running" ||
            (Boolean(newStoryQuery) && !needsEmotionSelection)
          }
          estimateMinutes={formatEstimateMinutes(getStoryEstimateMs())}
          onSelectEmotion={(emotion) => {
            setSelectedEmotion(emotion);
            setNeedsEmotionSelection(false);
            setCreateEpoch((prev) => prev + 1);
          }}
          onCancel={handleCancelJob}
          onPlay={() => router.push(`/cuentos/${job?.result?.storyId}`)}
          onBack={() => router.replace("/parentDashboard?section=guides")}
          formatEmotionLabel={formatEmotionLabel}
        />
      )}

      <div className="max-w-4xl ">
        <div className="mi-section-header">
          <h1 className="text-xl md:text-3xl tracking-tight font-extrabold text-neutral-800 mi-section-title">
            {"Tu biblioteca de cuentos"}
          </h1>
          <p className="text-neutral-600">
            Accede a todos los cuentos emocionales que has creado (
            {savedGuides.length})
          </p>
        </div>

        <StoryGrid
          guides={savedGuides}
          createdAtById={createdAtById}
          latestGuideId={latestGuideId}
          isLoaded={isLoaded}
          onPlay={handlePlayGuide}
          onDelete={handleDeleteGuide}
          formatEmotionLabel={formatEmotionLabel}
        />
      </div>
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

function formatEmotionLabel(emotion?: string) {
  if (!emotion) return "Emoción";
  const normalized = emotion.toLowerCase();
  switch (normalized) {
    case "verguenza":
      return "Vergüenza";
    case "alegria":
      return "Alegría";
    case "miedo":
      return "Miedo";
    case "ira":
      return "Ira";
    case "tristeza":
      return "Tristeza";
    case "celos":
      return "Celos";
    case "calma":
      return "Calma";
    default:
      return normalized.charAt(0).toUpperCase() + normalized.slice(1);
  }
}
