import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Story, JourneyStep } from "@/lib/stories";
import { useJourneyAudio } from "@/hooks/useJourneyAudio";

export interface JourneyPlayerState {
  journeyState: "idle" | "playing" | "paused" | "finished"; // Añadido 'paused'
  currentStep: JourneyStep | null;
  stepBackgroundUrl: string | null;
  selectedChoiceId: string | null;
  isPlayingAudio: boolean; // Sigue reflejando el estado real del audio
  handleStartJourney: () => void;
  handleUserInteraction: (interactionValue?: string) => void;
  handleTogglePlayPause: () => void; // Añadido handler
}

export function useJourneyPlayer(story: Story | undefined): JourneyPlayerState {
  const router = useRouter();

  const [journeyState, setJourneyState] = useState<
    "idle" | "playing" | "paused" | "finished"
  >("idle"); // Actualizado
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<JourneyStep | null>(null);
  const [stepBackgroundUrl, setStepBackgroundUrl] = useState<string | null>(
    null
  );
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  const advanceToStepRef = useRef<(nextStepId: string) => void>(null);

  const handleAudioEnd = useCallback(() => {
    const step = currentStep;
    if (step?.interaction.type === "auto_proceed") {
      advanceToStepRef.current?.(step.interaction.nextStepId);
    }
  }, [currentStep]);

  const {
    playAudio,
    stopAudio,
    isPlaying: isPlayingAudio,
  } = useJourneyAudio({
    onStepComplete: handleAudioEnd,
  });

  const advanceToStep = useCallback(
    (nextStepId: string) => {
      const endUrl = `/end/${story?.guideId}`;
      if (nextStepId === "end") {
        setJourneyState("finished");
        stopAudio();
        if (window.umami && story) {
          window.umami.track("journey_completed", { storyId: story.id });
        }
        setTimeout(() => router.push(endUrl), 1500);
        return;
      }
      const nextStep = story?.steps.find((s) => s.id === nextStepId) ?? null;
      if (nextStep) {
        setCurrentStepId(nextStepId);
        setSelectedChoiceId(null);
      } else {
        console.error(
          `Error: No se encontró el siguiente paso con ID: ${nextStepId}`
        );
        router.push(endUrl);
      }
    },
    [story, router, stopAudio]
  );

  useEffect(() => {
    advanceToStepRef.current = advanceToStep;
  }, [advanceToStep]);

  const handleStartJourney = useCallback(() => {
    if (story) {
      setJourneyState("playing");
      setCurrentStepId(story.initialStepId);
      setSelectedChoiceId(null);
      if (window.umami) {
        window.umami.track("journey_started", { storyId: story.id });
      }
    }
  }, [story]);

  const handleUserInteraction = useCallback(
    (interactionValue?: string) => {
      if (
        journeyState === "playing" &&
        currentStep?.interaction.type === "wait_for_tap"
      ) {
        if (currentStep.visuals.type === "choice" && interactionValue) {
          setSelectedChoiceId(interactionValue);
        }
        setTimeout(() => {
          advanceToStepRef.current?.(currentStep.interaction.nextStepId);
        }, 400);
      }
    },
    [currentStep, journeyState]
  );

  // --- NUEVO: Handler para Pausa/Play ---
  const handleTogglePlayPause = useCallback(() => {
    if (journeyState === "playing") {
      stopAudio(); // O pauseAudio() si tu hook lo implementa
      setJourneyState("paused");
    } else if (journeyState === "paused") {
      setJourneyState("playing"); // El useEffect del audio se encargará de llamar a playAudio
    }
  }, [journeyState, stopAudio /* pauseAudio, playAudio */]); // Añade play/pause si los usas

  useEffect(() => {
    /* Efecto para cargar step y fondo - sin cambios */
    let stepData: JourneyStep | null = null;
    if (journeyState === "playing" && story && currentStepId) {
      stepData = story.steps.find((s) => s.id === currentStepId) ?? null;
      setCurrentStep(stepData);
      if (!stepData) {
        console.error(
          `Error: No se encontraron datos para el paso con ID: ${currentStepId}`
        );
      }
    } else if (journeyState !== "paused") {
      // No limpiar currentStep si está pausado
      setCurrentStep(null);
    }
    const newBgUrl = stepData?.visuals?.backgroundImage ?? null;
    setStepBackgroundUrl(newBgUrl);
  }, [currentStepId, story, journeyState]);

  useEffect(() => {
    // Efecto para reproducir audio
    if (journeyState === "paused") {
      // Si está pausado, detiene audio y no hace más
      stopAudio();
      return;
    }
    if (journeyState !== "playing") {
      // Si no está jugando (idle, finished), detiene audio
      stopAudio();
      return;
    }

    if (currentStep) {
      if (currentStep.isNarration && currentStep.audioSrc) {
        playAudio(currentStep.audioSrc);
      } else {
        stopAudio();
        if (
          currentStep.isNarration &&
          !currentStep.audioSrc &&
          currentStep.interaction.type === "auto_proceed"
        ) {
          setTimeout(
            () =>
              advanceToStepRef.current?.(currentStep.interaction.nextStepId),
            0
          );
        }
      }
    } else {
      stopAudio();
    }
  }, [currentStep, journeyState, playAudio, stopAudio]); // Quitamos advanceToStep de aquí

  return {
    journeyState,
    currentStep,
    stepBackgroundUrl,
    selectedChoiceId,
    isPlayingAudio, // Sigue reflejando estado real del audio
    handleStartJourney,
    handleUserInteraction,
    handleTogglePlayPause, // Exporta el nuevo handler
  };
}
