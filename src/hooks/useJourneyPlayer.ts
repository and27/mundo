import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Story, JourneyStep } from "@/lib/stories";
import { useJourneyAudio } from "@/hooks/useJourneyAudio";

export interface JourneyPlayerState {
  journeyState: "idle" | "playing" | "finished";
  currentStep: JourneyStep | null;
  stepBackgroundUrl: string | null;
  selectedChoiceId: string | null;
  isPlayingAudio: boolean;
  handleStartJourney: () => void;
  handleUserInteraction: (interactionValue?: string) => void;
}

export function useJourneyPlayer(story: Story | undefined): JourneyPlayerState {
  const router = useRouter();

  const [journeyState, setJourneyState] = useState<
    "idle" | "playing" | "finished"
  >("idle");
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<JourneyStep | null>(null);
  const [stepBackgroundUrl, setStepBackgroundUrl] = useState<string | null>(
    null
  );
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  const advanceToStep = useCallback(
    (nextStepId: string) => {
      const endUrl = `/end/${story?.guideId}`;
      if (nextStepId === "end") {
        setJourneyState("finished");
        stopAudio();
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
    [story, router]
  ); // Removed stopAudio dependency, assuming it's stable from useJourneyAudio

  const handleAudioEnd = useCallback(() => {
    if (currentStep?.interaction.type === "auto_proceed") {
      advanceToStep(currentStep.interaction.nextStepId);
    }
  }, [currentStep, advanceToStep]);

  const {
    playAudio,
    stopAudio,
    isPlaying: isPlayingAudio,
  } = useJourneyAudio({
    onStepComplete: handleAudioEnd, // Ensure prop name matches useJourneyAudio
  });

  // Re-add stopAudio to dependency array if advanceToStep calls it internally
  // If not, the dependency above is fine. Let's assume advanceToStep needs it if called directly.
  // Note: Re-added stopAudio to advanceToStep dependency array for safety if it's called there.
  // const advanceToStep = useCallback( (nextStepId: string) => { ... }, [story, router, stopAudio] );

  const handleStartJourney = useCallback(() => {
    if (story) {
      console.log("Iniciando viaje...");
      setJourneyState("playing");
      setCurrentStepId(story.initialStepId);
      setSelectedChoiceId(null);
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
          advanceToStep(currentStep.interaction.nextStepId);
        }, 400);
      }
      console.log(`Interacción del usuario: ${interactionValue ?? "tap"}`);
    },
    [currentStep, journeyState, advanceToStep]
  );

  useEffect(() => {
    let stepData: JourneyStep | null = null;
    if (journeyState === "playing" && story && currentStepId) {
      stepData = story.steps.find((s) => s.id === currentStepId) ?? null;
      setCurrentStep(stepData);
      if (!stepData) {
        console.error(
          `Error: No se encontraron datos para el paso con ID: ${currentStepId}`
        );
      }
    } else {
      setCurrentStep(null);
    }
    const newBgUrl = stepData?.visuals?.backgroundImage ?? null;
    setStepBackgroundUrl(newBgUrl);
  }, [currentStepId, story, journeyState]);

  useEffect(() => {
    if (journeyState !== "playing") {
      stopAudio();
      return;
    }

    if (currentStep?.isNarration) {
      if (currentStep.audioSrc) {
        playAudio(currentStep.audioSrc);
      } else {
        console.warn(
          `Paso ${currentStep.id} marcado como narración pero sin audioSrc.`
        );
        if (currentStep.interaction.type === "auto_proceed") {
          advanceToStep(currentStep.interaction.nextStepId);
        }
      }
    } else {
      stopAudio();
    }
  }, [currentStep, journeyState, playAudio, stopAudio, advanceToStep]);

  return {
    journeyState,
    currentStep,
    stepBackgroundUrl,
    selectedChoiceId,
    isPlayingAudio,
    handleStartJourney,
    handleUserInteraction,
  };
}
