"use client";

import { useParams, useRouter } from "next/navigation";
import { stories } from "@/lib/stories";
import { guides, Guide } from "@/lib/guides";
import { useJourneyPlayer } from "@/hooks/useJourneyPlayer";
import SubtitleDisplay from "@/components/journey/SubtitleDisplay";
import DynamicBackgroundOverlay from "@/components/journey/DynamicBackgroundOverlay";
import GuideVisualDisplay from "@/components/journey/GuideVisualDisplay";
import JourneyIdleScreen from "@/components/journey/JourneyIdleScreen";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import JourneyControlsBar from "@/components/journey/JourneyControls";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CuentoPage() {
  const { id } = useParams();
  const story = stories.find((s) => s.id === id);
  const guide: Guide | undefined = guides.find((g) => g.id === story?.guideId);

  const {
    journeyState,
    currentStep,
    stepBackgroundUrl,
    handleStartJourney,
    handleTogglePlayPause,
    handleGoBack,
    handleGoForward,
    canGoBack,
    canGoForward,
  } = useJourneyPlayer(story);

  const showSubtitles = useOnboardingStore((state) => state.showSubtitles);
  const toggleSubtitles = useOnboardingStore((state) => state.toggleSubtitles);
  const router = useRouter();

  // const renderStepContentInsideBox = () => {
  //   if (!currentStep) return null;

  //   switch (currentStep.visuals.type) {
  //     case "scene":
  //       return (
  //         <SceneDisplay
  //           text={currentStep.visuals.text}
  //           foregroundImage={currentStep.visuals.foregroundImage}
  //         />
  //       );
  //     case "breathing":
  //       return null;
  //     case "choice":
  //       return (
  //         <ChoiceSelector
  //           choices={currentStep.visuals.choices ?? []}
  //           onSelect={handleUserInteraction}
  //           selectedChoiceId={selectedChoiceId}
  //         />
  //       );
  //     case "game":
  //       return <p>Tipo de paso game aún no implementado.</p>;
  //     default:
  //       console.warn(`Tipo visual no reconocido: ${currentStep.visuals.type}`);
  //       return null;
  //   }
  // };

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

      {(journeyState === "playing" || journeyState === "paused") && (
        <>
          <button
            onClick={handleGoBack}
            disabled={!canGoBack}
            className={`
              fixed left-0 top-1/2 -translate-y-1/2 z-20
              h-32 w-16 flex items-center justify-center
              bg-gradient-to-r from-black/80 via-black/40 to-transparent
              text-white/70 hover:text-white
              transition-all duration-300
              ${
                canGoBack
                  ? "opacity-100 hover:bg-gradient-to-r hover:from-black/90 hover:via-black/60 hover:to-transparent"
                  : "opacity-30 cursor-not-allowed"
              }
            `}
            aria-label="Paso anterior"
          >
            <ChevronLeft size={32} strokeWidth={2.5} />
          </button>

          <button
            onClick={handleGoForward}
            disabled={!canGoForward}
            className={`
              fixed right-0 top-1/2 -translate-y-1/2 z-20
              h-32 w-16 flex items-center justify-center
              bg-gradient-to-l from-black/80 via-black/40 to-transparent
              text-white/70 hover:text-white
              transition-all duration-300
              ${
                canGoForward
                  ? "opacity-100 hover:bg-gradient-to-l hover:from-black/90 hover:via-black/60 hover:to-transparent"
                  : "opacity-30 cursor-not-allowed"
              }
            `}
            aria-label="Siguiente paso"
          >
            <ChevronRight size={32} strokeWidth={2.5} />
          </button>
        </>
      )}

      <section className="bg-black/50 backdrop-blur-sm w-full min-h-screen flex justify-center items-center overflow-hidden">
        <DynamicBackgroundOverlay imageUrl={stepBackgroundUrl} />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-between text-white text-center pt-5 md:pt-10 px-4 pb-24 sm:pb-28">
          {currentStep?.visuals.type === "breathing" && (
            <GuideVisualDisplay
              guideImageSrc={guide.imageTransparent || ""}
              isBreathing={
                journeyState === "playing" &&
                currentStep?.visuals.type === "breathing"
              }
            />
          )}

          <div className="-mt-12 w-full max-w-2xl flex flex-col items-center justify-end flex-grow gap-5 rounded-2xl text-white p-4 sm:p-6 overflow-y-auto">
            {journeyState === "idle" && (
              <JourneyIdleScreen
                title={story.title}
                description={story.description}
                onStartJourney={handleStartJourney}
              />
            )}
            {journeyState === "paused" && (
              <p className="text-xl opacity-80">Pausado...</p>
            )}
            {journeyState === "finished" && (
              <div className="flex flex-col items-center gap-4">
                <p className="text-xl">¡Viaje completado!</p>
              </div>
            )}
            {journeyState === "playing" && showSubtitles && (
              <div className="p-8 pointer-events-none">
                <SubtitleDisplay text={currentStep?.subtitle} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
