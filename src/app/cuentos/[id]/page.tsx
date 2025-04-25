"use client";

import { useParams } from "next/navigation";
import { stories } from "@/lib/stories";
import { guides, Guide } from "@/lib/guides";
import { useJourneyPlayer } from "@/hooks/useJourneyPlayer";
import ChoiceSelector from "@/components/journey/ChoiceSelector";
import SubtitleDisplay from "@/components/journey/SubtitleDisplay";
import DynamicBackgroundOverlay from "@/components/journey/DynamicBackgroundOverlay";
import GuideVisualDisplay from "@/components/journey/GuideVisualDisplay";
import SceneDisplay from "@/components/journey/SceneDisplay";
import JourneyIdleScreen from "@/components/journey/JourneyIdleScreen";

export default function CuentoPage() {
  const { id } = useParams();
  const story = stories.find((s) => s.id === id);
  const guide: Guide | undefined = guides.find((g) => g.id === story?.guideId);

  const {
    journeyState,
    currentStep,
    stepBackgroundUrl,
    selectedChoiceId,
    handleStartJourney,
    handleUserInteraction,
  } = useJourneyPlayer(story);

  const renderStepContentInsideBox = () => {
    if (!currentStep) return null;

    switch (currentStep.visuals.type) {
      case "scene":
        return (
          <SceneDisplay
            text={currentStep.visuals.text}
            foregroundImage={currentStep.visuals.foregroundImage}
          />
        );
      case "breathing":
        return null;
      case "choice":
        return (
          <ChoiceSelector
            choices={currentStep.visuals.choices ?? []}
            onSelect={handleUserInteraction}
            selectedChoiceId={selectedChoiceId}
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
      <section className="bg-black/30 backdrop-blur-md w-full min-h-screen overflow-hidden ">
        <div className="mx-auto relative max-w-7xl flex justify-center items-center h-screen">
          <DynamicBackgroundOverlay imageUrl={stepBackgroundUrl} />

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-start text-white text-center pt-5 md:pt-10 px-4">
            <GuideVisualDisplay
              guideImageSrc={guide.imageTransparent || ""}
              isBreathing={
                journeyState === "playing" &&
                currentStep?.visuals.type === "breathing"
              }
            />

            <div className="-mt-12 w-full max-w-2xl flex flex-col items-center justify-center gap-5 rounded-2xl text-white shadow-2xl border border-white/20 p-4 sm:p-6 min-h-[300px] sm:min-h-[400px] ">
              {journeyState === "idle" && (
                <JourneyIdleScreen
                  onStartJourney={handleStartJourney}
                  title={story.title}
                  description={story.description}
                />
              )}

              {journeyState === "playing" && renderStepContentInsideBox()}

              {journeyState === "finished" && (
                <div className="flex flex-col items-center gap-4">
                  <p className="text-xl">¡Viaje completado!</p>
                </div>
              )}
              {journeyState === "playing" && (
                <SubtitleDisplay text={currentStep?.subtitle} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
