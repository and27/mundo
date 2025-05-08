"use client";

import { useParams, useRouter } from "next/navigation";
import { stories } from "@/lib/stories";
import { guides, Guide } from "@/lib/guides";
import { useJourneyPlayer } from "@/hooks/useJourneyPlayer";
import ChoiceSelector from "@/components/journey/ChoiceSelector";
import SubtitleDisplay from "@/components/journey/SubtitleDisplay";
import DynamicBackgroundOverlay from "@/components/journey/DynamicBackgroundOverlay";
import GuideVisualDisplay from "@/components/journey/GuideVisualDisplay";
import SceneDisplay from "@/components/journey/SceneDisplay";
import JourneyIdleScreen from "@/components/journey/JourneyIdleScreen";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import JourneyControlsBar from "@/components/journey/JourneyControls";

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
    handleTogglePlayPause,
  } = useJourneyPlayer(story);

  const showSubtitles = useOnboardingStore((state) => state.showSubtitles);
  const toggleSubtitles = useOnboardingStore((state) => state.toggleSubtitles);
  const router = useRouter();
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
      {(journeyState === "playing" || journeyState === "paused") && (
        <JourneyControlsBar
          isPlaying={journeyState === "playing"}
          onTogglePlayPause={handleTogglePlayPause}
          subtitlesEnabled={showSubtitles}
          onToggleSubtitles={toggleSubtitles}
          onExitJourney={() => router.push("/")}
        />
      )}
      <section className="bg-black/50 backdrop-blur-sm w-full min-h-screen flex justify-center items-center overflow-hidden">
        <DynamicBackgroundOverlay imageUrl={stepBackgroundUrl} />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-start text-white text-center pt-5 md:pt-10 px-4 pb-24 sm:pb-28">
          <GuideVisualDisplay
            guideImageSrc={guide.imageTransparent || ""}
            isBreathing={
              journeyState === "playing" &&
              currentStep?.visuals.type === "breathing"
            }
          />

          <div className="-mt-12 w-full max-w-2xl flex flex-col items-center justify-center flex-grow gap-5 rounded-2xl text-white shadow-2xl border border-white/20 p-4 sm:p-6 min-h-[400px] bg-white/5 overflow-y-auto">
            {journeyState === "idle" && (
              <JourneyIdleScreen
                title={story.title}
                description={story.description}
                onStartJourney={handleStartJourney}
              />
            )}
            {journeyState === "playing" && renderStepContentInsideBox()}
            {journeyState === "paused" && (
              <p className="text-xl opacity-80">Pausado...</p>
            )}
            {journeyState === "finished" && (
              <div className="flex flex-col items-center gap-4">
                <p className="text-xl">¡Viaje completado!</p>
              </div>
            )}
            {journeyState === "playing" && showSubtitles && (
              <div className=" pointer-events-none">
                <SubtitleDisplay text={currentStep?.subtitle} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
