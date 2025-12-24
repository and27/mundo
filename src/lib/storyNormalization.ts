import type {
  PromptGeneratedStory,
  PromptStoryStep,
} from "@/types/promptGenerationTypes";
import type { JourneyStep, Story } from "@/types/story";

function normalizeStep(
  step: PromptStoryStep,
  index: number,
  allSteps: PromptStoryStep[]
): JourneyStep {
  const id = step.id || `scene_${index + 1}`;
  const nextStepId = allSteps[index + 1]?.id ?? "end";

  return {
    id,
    subtitle: step.subtitle,
    audioSrc: step.audioSrc ?? "",
    isNarration: step.isNarration ?? true,
    visuals: {
      type: step.visuals?.type ?? "scene",
      backgroundImage: step.visuals?.backgroundImage,
      foregroundImage: step.visuals?.foregroundImage,
      breathingCueType: step.visuals?.breathingCueType,
      choices: step.visuals?.choices,
      gameComponentId: step.visuals?.gameComponentId,
    },
    interaction: {
      type: step.interaction?.type ?? "auto_proceed",
      nextStepId: step.interaction?.nextStepId ?? nextStepId,
      branching: step.interaction?.branching,
      defaultNextStepId: step.interaction?.defaultNextStepId ?? null,
      tappableTarget: step.interaction?.tappableTarget,
    },
  };
}

export function normalizeGeneratedStory(input: PromptGeneratedStory): Story {
  const steps = input.steps.map((step, index, all) =>
    normalizeStep(step, index, all)
  );

  return {
    id: input.id,
    title: input.title,
    description: input.description,
    guideId: input.guideId,
    category: input.category as Story["category"],
    coverImage: input.coverImage,
    initialStepId: input.initialStepId || steps[0]?.id || "scene_1",
    steps,
  };
}
