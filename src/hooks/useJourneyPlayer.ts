import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Story, JourneyStep } from "@/lib/stories";
import { useJourneyAudio } from "@/hooks/useJourneyAudio";

export interface JourneyPlayerState {
  journeyState: "idle" | "playing" | "paused" | "finished";
  currentStep: JourneyStep | null;
  stepBackgroundUrl: string | null;
  selectedChoiceId: string | null;
  isPlayingAudio: boolean;
  handleStartJourney: () => void;
  handleUserInteraction: (interactionValue?: string) => void;
  handleTogglePlayPause: () => void;
}

export function useJourneyPlayer(story: Story | undefined): JourneyPlayerState {
  const router = useRouter();

  const [journeyState, setJourneyState] = useState<
    "idle" | "playing" | "paused" | "finished"
  >("idle");
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<JourneyStep | null>(null);
  const [stepBackgroundUrl, setStepBackgroundUrl] = useState<string | null>(
    null
  );
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  const advanceToStepRef = useRef<(nextStepId: string) => void>(null);

  const handleAudioEnd = useCallback(() => {
    const step = currentStep;
    if (
      step?.interaction.type === "auto_proceed" &&
      step.interaction.nextStepId
    ) {
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
      const endUrl = `/end/${story?.guideId}?story=${story?.id}`;
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
        let nextStepId: string | null = null;

        if (currentStep.visuals.type === "choice" && interactionValue) {
          setSelectedChoiceId(interactionValue);

          if (window.umami && story && currentStep) {
            const choiceLabel =
              currentStep.visuals.choices?.find(
                (c) => c.id === interactionValue
              )?.label || interactionValue;
            window.umami.track("journey_choice_made", {
              storyId: story.id,
              stepId: currentStep.id,
              choice: choiceLabel,
            });
          }

          // --- Lógica Flexible: Intenta Branching primero, luego nextStepId ---
          const branch = currentStep.interaction.branching?.find(
            (b) => b.choiceId === interactionValue
          );
          if (branch) {
            // Si hay branching y coincide la opción, usa esa ruta
            nextStepId = branch.nextStepId;
          } else if (currentStep.interaction.nextStepId) {
            // Si no hay branching O no coincidió, pero SÍ hay un nextStepId simple, úsalo
            // (Esto cubrirá el caso de j1_prompt)
            nextStepId = currentStep.interaction.nextStepId;
          } else {
            // Si no hay branching Y TAMPOCO hay nextStepId simple, usa el default o fallback
            console.warn(
              `No specific branch or nextStepId found for choice: ${interactionValue}. Using defaultNextStepId.`
            );
            nextStepId = currentStep.interaction.defaultNextStepId ?? null;
          }
          // --- Fin Lógica Flexible ---
        } else if (currentStep.interaction.nextStepId) {
          // Si NO es una elección (o no hubo interactionValue), pero SÍ hay un nextStepId simple
          nextStepId = currentStep.interaction.nextStepId;
        } else {
          console.warn(
            `Tap interaction on step ${currentStep.id} without clear next step defined.`
          );
          nextStepId = currentStep.interaction.defaultNextStepId ?? null; // Usa default como último recurso
        }

        // --- Avanzar si se determinó un paso ---
        if (nextStepId) {
          setTimeout(() => {
            advanceToStepRef.current?.(nextStepId as string);
          }, 400);
        } else {
          console.error(
            `Could not determine next step from: ${currentStep.id}`
          );
          setTimeout(() => {
            advanceToStepRef.current?.("end"); // Ir al final si no hay ruta clara
          }, 400);
        }
      }
    },
    [currentStep, journeyState, story]
  );

  const handleTogglePlayPause = useCallback(() => {
    if (journeyState === "playing") {
      stopAudio();
      setJourneyState("paused");
    } else if (journeyState === "paused") {
      setJourneyState("playing");
    }
  }, [journeyState, stopAudio]);

  useEffect(() => {
    let stepData: JourneyStep | null = null;
    if (
      (journeyState === "playing" || journeyState === "paused") &&
      story &&
      currentStepId
    ) {
      stepData = story.steps.find((s) => s.id === currentStepId) ?? null;
      if (!stepData && currentStep !== null) {
        console.error(
          `Error: No se encontraron datos para el paso con ID: ${currentStepId}`
        );
        setCurrentStep(null);
      } else if (stepData && currentStep?.id !== stepData.id) {
        setCurrentStep(stepData);
      }
    } else if (journeyState === "idle" || journeyState === "finished") {
      setCurrentStep(null);
    }
    const newBgUrl = stepData?.visuals?.backgroundImage ?? null;
    if (newBgUrl !== stepBackgroundUrl) {
      setStepBackgroundUrl(newBgUrl);
    }
  }, [currentStepId, story, journeyState, currentStep, stepBackgroundUrl]);

  useEffect(() => {
    if (journeyState === "paused") {
      stopAudio();
      return;
    }
    if (journeyState !== "playing") {
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
          currentStep.interaction.type === "auto_proceed" &&
          currentStep.interaction.nextStepId
        ) {
          setTimeout(
            () =>
              advanceToStepRef.current?.(
                currentStep.interaction.nextStepId as string
              ),
            0
          );
        }
      }
    } else {
      stopAudio();
    }
  }, [currentStep, journeyState, playAudio, stopAudio]);

  return {
    journeyState,
    currentStep,
    stepBackgroundUrl,
    selectedChoiceId,
    isPlayingAudio,
    handleStartJourney,
    handleUserInteraction,
    handleTogglePlayPause,
  };
}
