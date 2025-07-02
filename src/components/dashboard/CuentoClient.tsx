"use client";

import { useRouter } from "next/navigation";
import { useJourneyPlayer } from "@/hooks/useJourneyPlayer";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { Story } from "@/types/story";
import { Guide } from "@/lib/guides";
import SubtitleDisplay from "@/components/journey/SubtitleDisplay";
import GuideVisualDisplay from "@/components/journey/GuideVisualDisplay";
import JourneyIdleScreen from "@/components/journey/JourneyIdleScreen";
import JourneyControlsBar from "@/components/journey/JourneyControls";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SceneWithCharacter from "../journey/SceneWithCharacter";
import { getCharacterImage } from "@/lib/getCharacterImage";

export default function CuentoClient({
  story,
  guide,
}: {
  story: Story;
  guide: Guide;
}) {
  const router = useRouter();

  const {
    journeyState,
    currentStep,
    stepBackgroundUrl,
    selectedChoiceId,
    isPlayingAudio,
    handleStartJourney,
    handleUserInteraction,
    handleTogglePlayPause,
    handleGoBack,
    handleGoForward,
    canGoBack,
    canGoForward,
  } = useJourneyPlayer(story);

  const showSubtitles = useOnboardingStore((state) => state.showSubtitles);
  const toggleSubtitles = useOnboardingStore((state) => state.toggleSubtitles);

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
        <SceneWithCharacter
          backgroundUrl={currentStep?.visuals?.backgroundImage || ""}
          characterUrl={getCharacterImage(
            story.guideId || guide.id,
            story.category ?? "emotions"
          )}
        />

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
