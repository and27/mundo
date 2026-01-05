import type {
  ActionableGuide,
  EmotionId,
  ParentGuideSection,
} from "@/types/ai";
import type { ParentGuideV1 } from "@/schemas/parentGuide.v1";
import type { ParentGuideV2 } from "@/schemas/parentGuide.v2";

function normalizeEmotionId(value: string): EmotionId | undefined {
  const normalized = value.trim().toLowerCase();
  if (normalized === "miedo") return "miedo";
  if (normalized === "ira") return "ira";
  if (normalized === "tristeza") return "tristeza";
  if (normalized === "verguenza") return undefined;
  return undefined;
}

function normalizeFromV1(input: ParentGuideV1): ActionableGuide {
  const sections: ParentGuideSection[] = [
    {
      kind: "metaphor",
      title: "Cuento",
      content: input.metaphorStory,
    },
    {
      kind: "language",
      title: "Acompanamiento",
      phrases: input.conversationPlan.phrasesToValidate,
      questions: input.conversationPlan.questionsToExplore,
    },
    {
      kind: "practice",
      title: input.suggestedActivity.title,
      description: input.suggestedActivity.description,
      materials: input.suggestedActivity.materials,
    },
  ];
  return {
    id: input.id,
    guideTitle: input.guideTitle,
    emotionId: normalizeEmotionId(input.emotion),
    tags: input.tags ?? [],
    riskAssessment: input.riskAssessment,
    sections,
  };
}

function normalizeFromV2(input: ParentGuideV2): ActionableGuide {
  return {
    id: input.id,
    guideTitle: input.guideTitle,
    emotionId: normalizeEmotionId(input.emotion),
    tags: input.tags ?? [],
    riskAssessment: input.riskAssessment,
    sections: input.sections,
  };
}

export function normalizeParentGuide(
  input: ParentGuideV1 | ParentGuideV2
): ActionableGuide {
  if ("sections" in input) {
    return normalizeFromV2(input);
  }
  return normalizeFromV1(input);
}
