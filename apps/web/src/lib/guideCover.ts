import type { EmotionId } from "@/types/ai";

export type GuideCoverStrategy = "local_program_v1";

export type GuideCover = {
  src: string;
  strategy: GuideCoverStrategy;
};

/**
 * Decoupled cover selection.
 * Today: local assets in /public/images/program.
 * Future: swap strategy to per-guide generated covers without touching StoryCard.
 */
export function getGuideCover(
  emotionId?: EmotionId | null
): GuideCover {
  const emotion = emotionId ?? null;

  switch (emotion) {
    case "miedo":
      return { src: "/images/program/fear.png", strategy: "local_program_v1" };
    case "tristeza":
      return {
        src: "/images/program/sadness.png",
        strategy: "local_program_v1",
      };
    case "ira":
      return {
        src: "/images/program/angry.png",
        strategy: "local_program_v1",
      };
    case "celos":
      return {
        src: "/images/program/jealousy.png",
        strategy: "local_program_v1",
      };
    case "alegria":
      return { src: "/images/program/joy.png", strategy: "local_program_v1" };
    case "verguenza":
      return {
        src: "/images/program/shame.png",
        strategy: "local_program_v1",
      };
    case "calma":
    default:
      return {
        src: "/images/program/cover.png",
        strategy: "local_program_v1",
      };
  }
}

