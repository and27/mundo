"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { stories, JourneyStep, Story } from "@/lib/stories";
import { guides, Guide } from "@/lib/guides";
import { useJourneyAudio } from "@/hooks/useJourneyAudio";
import SceneDisplay from "@/components/journey/SceneDisplay";
import BreathingDisplay from "@/components/journey/BreathingDisplay";
import ChoiceSelector from "@/components/journey/ChoiceSelector";
// import GameWrapper from "@/components/journey/GameWrapper";
import GuideHeader from "@/components/breathing/GuideHeader";
import { FaPlay } from "react-icons/fa";
import SubtitleDisplay from "@/components/journey/SubtitleDisplay";

export default function CuentoPage() {
  const { id } = useParams();
  const router = useRouter();

  const story: Story | undefined = stories.find((s) => s.id === id);

  const [journeyState, setJourneyState] = useState<
    "idle" | "playing" | "finished"
  >("idle");
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<JourneyStep | null>(null);

  const endUrl = `/end/${story?.guideId}`;
  const advanceStep = useCallback(
    (nextStepId: string) => {
      if (nextStepId === "end") {
        setJourneyState("finished");
        stopAudio();
        setTimeout(() => router.push(endUrl), 1500);
        return;
      }
      const nextStep = story?.steps.find((s) => s.id === nextStepId) ?? null;
      if (nextStep) {
        setCurrentStepId(nextStepId);
      } else {
        console.error(
          `Error: No se encontró el siguiente paso con ID: ${nextStepId}`
        );
        router.push(endUrl);
      }
    },
    [story, router]
  );

  const handleAudioEnd = useCallback(() => {
    if (currentStep?.interaction.type === "auto_proceed") {
      advanceStep(currentStep.interaction.nextStepId);
    }
  }, [currentStep, advanceStep]);

  const { playAudio, stopAudio } = useJourneyAudio({
    onStepComplete: handleAudioEnd,
  });

  const guide: Guide | undefined = guides.find((g) => g.id === story?.guideId);

  useEffect(() => {
    if (journeyState === "playing" && story && currentStepId) {
      const stepData = story.steps.find((s) => s.id === currentStepId);
      setCurrentStep(stepData ?? null);
      if (!stepData) {
        console.error(
          `Error: No se encontraron datos para el paso con ID: ${currentStepId}`
        );
      }
    } else {
      setCurrentStep(null);
    }
  }, [currentStepId, story, journeyState]);

  useEffect(() => {
    if (journeyState === "playing" && currentStep?.isNarration) {
      if (currentStep.audioSrc) {
        playAudio(currentStep.audioSrc);
      } else {
        console.warn(
          `Paso ${currentStep.id} marcado como narración pero sin audioSrc.`
        );
        if (currentStep.interaction.type === "auto_proceed") {
          advanceStep(currentStep.interaction.nextStepId);
        }
      }
    }
  }, [currentStep, journeyState, playAudio, advanceStep]); // stopAudio removed from deps

  const handleStartJourney = () => {
    if (story) {
      console.log("Iniciando viaje...");
      setCurrentStepId(story.initialStepId);
      setJourneyState("playing");
    }
  };

  const handleUserInteraction = useCallback(
    (interactionValue?: string) => {
      if (
        journeyState === "playing" &&
        currentStep?.interaction.type === "wait_for_tap"
      ) {
        advanceStep(currentStep.interaction.nextStepId);
      }
      console.log(`Interacción del usuario: ${interactionValue}`);
    },
    [currentStep, advanceStep, journeyState]
  );

  const renderStepContent = () => {
    if (journeyState !== "playing" || !currentStep) {
      return null;
    }

    switch (currentStep.visuals.type) {
      case "scene":
        return (
          <SceneDisplay
            text={currentStep.visuals.text}
            foregroundImage={currentStep.visuals.backgroundImage}
          />
        );
      case "breathing":
        return <BreathingDisplay />;
      case "choice":
        return (
          <ChoiceSelector
            choices={currentStep.visuals.choices ?? []}
            onSelect={handleUserInteraction}
          />
        );
      case "game":
        return <p>Tipo de paso game aún no implementado.</p>;
      default:
        console.warn(`Tipo visual no reconocido: ${currentStep.visuals.type}`);
        return null;
    }
  };

  if (!story)
    return (
      <div className="text-white text-center pt-20">Historia no encontrada</div>
    );
  if (!guide)
    return (
      <div className="text-white text-center pt-20">Guía no encontrada</div>
    );

  return (
    <>
      <section className="relative w-full min-h-screen flex justify-center items-center overflow-hidden aspect-[6/9] sm:aspect-[9/8] md:aspect-[4/3]">
        {/* <ForestWithLights fireflyCount={5} /> */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-start text-white text-center pt-5  md:pt-10  px-4">
          <GuideHeader image={guide.imageTransparent} />
          <div className="-mt-2 w-full max-w-2xl flex flex-col items-center justify-around gap-5 bg-white/10 backdrop-blur-md rounded-2xl text-white shadow-2xl border border-white/20 p-4 sm:p-6 min-h-[300px] sm:min-h-[400px]">
            {journeyState === "idle" && (
              <div className="flex flex-col items-center gap-4">
                <h2 className="text-2xl font-semibold">{story.title}</h2>
                <p className="text-base">{story.description}</p>
                <button
                  onClick={handleStartJourney}
                  className="mt-4 px-6 py-3 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-colors duration-200 flex items-center gap-2 shadow-lg"
                >
                  <FaPlay />
                  Iniciar Viaje
                </button>
              </div>
            )}
            {journeyState === "playing" && renderStepContent()}
            {journeyState === "finished" && (
              <div className="flex flex-col items-center gap-4">
                <p className="text-xl">¡Viaje completado!</p>
              </div>
            )}
            <SubtitleDisplay text={currentStep?.subtitle} />
          </div>
        </div>
      </section>
    </>
  );
}
