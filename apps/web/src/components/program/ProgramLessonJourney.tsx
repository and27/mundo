"use client";

import { useJourneyPlayer } from "@/hooks/useJourneyPlayer";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import JourneyIdleScreen from "@/components/journey/JourneyIdleScreen";
import SubtitleDisplay from "@/components/journey/SubtitleDisplay";
import SceneWithCharacter from "@/components/journey/SceneWithCharacter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCharacterImage } from "@/lib/getCharacterImage";
import { Story } from "@/types/story";

export default function LessonJourneyPlayer({
  story,
  guideId,
  className = "",
}: {
  story: Story;
  guideId: string;
  className?: string;
}) {
  const {
    journeyState,
    currentStep,
    handleStartJourney,
    handleGoBack,
    handleGoForward,
    canGoBack,
    canGoForward,
  } = useJourneyPlayer(story);

  const showSubtitles = useOnboardingStore((s) => s.showSubtitles);
  // const toggleSubtitles = useOnboardingStore((s) => s.toggleSubtitles);

  return (
    <div
      className={[
        "relative bg-black/60 rounded-3xl overflow-hidden min-h-[240px] md:min-h-[300px]",
        className,
      ].join(" ")}
    >
      {/* {(journeyState === "playing" || journeyState === "paused") && (
        <JourneyControlsBar
          isPlaying={journeyState === "playing"}
          onTogglePlayPause={handleTogglePlayPause}
          subtitlesEnabled={showSubtitles}
          onToggleSubtitles={toggleSubtitles}
        />
      )} */}

      {journeyState !== "idle" && (
        <SceneWithCharacter
          backgroundUrl={currentStep?.visuals?.backgroundImage || ""}
          characterUrl={getCharacterImage(guideId, "emotions")}
        />
      )}

      <div className="relative z-10 p-6 flex flex-col items-center justify-center min-h-[240px] md:min-h-[300px] text-white">
        {journeyState === "idle" && (
          <JourneyIdleScreen
            title={story.title}
            description={story.description}
            onStartJourney={handleStartJourney}
          />
        )}

        {journeyState === "playing" && showSubtitles && (
          <SubtitleDisplay text={currentStep?.subtitle} />
        )}
      </div>

      {(journeyState === "playing" || journeyState === "paused") && (
        <>
          <button
            onClick={handleGoBack}
            disabled={!canGoBack}
            className="absolute left-0 top-1/2 -translate-y-1/2 h-24 w-12 text-white/70"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={handleGoForward}
            disabled={!canGoForward}
            className="absolute right-0 top-1/2 -translate-y-1/2 h-24 w-12 text-white/70"
          >
            <ChevronRight />
          </button>
        </>
      )}
    </div>
  );
}
