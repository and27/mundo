import type { ActionableGuide, EmotionId } from "@/types/ai";
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
  return {
    id: input.id,
    guideTitle: input.guideTitle,
    emotionId: normalizeEmotionId(input.emotion),
    tags: input.tags ?? [],
    metaphorStory: input.metaphorStory,
    conversationPlan: input.conversationPlan,
    suggestedActivity: input.suggestedActivity,
    riskAssessment: input.riskAssessment,
  };
}

function normalizeFromV2(input: ParentGuideV2): ActionableGuide {
  const metaphor = input.sections.find((s) => s.kind === "metaphor");
  const language = input.sections.find((s) => s.kind === "language");
  const practice = input.sections.find((s) => s.kind === "practice");
  const understanding = input.sections.find((s) => s.kind === "understanding");
  const normalization = input.sections.find((s) => s.kind === "normalization");
  const strategies = input.sections.find((s) => s.kind === "strategies");
  const reflection = input.sections.find((s) => s.kind === "reflection");
  const notes = input.sections.find((s) => s.kind === "notes");

  return {
    id: input.id,
    guideTitle: input.guideTitle,
    emotionId: normalizeEmotionId(input.emotion),
    tags: input.tags ?? [],
    understanding: understanding
      ? { title: understanding.title, content: understanding.content }
      : undefined,
    normalization: normalization ? normalization.bullets : undefined,
    metaphorStory: metaphor ? metaphor.content : "",
    conversationPlan: {
      phrasesToValidate: language?.phrases ?? [],
      questionsToExplore: language?.questions ?? [],
    },
    strategies: strategies
      ? [{ title: strategies.title, items: strategies.items }]
      : undefined,
    suggestedActivity: {
      title: practice?.title ?? "",
      description: practice?.description ?? "",
      materials: practice?.materials ?? "",
    },
    reflectionPrompts: reflection ? reflection.prompts : undefined,
    resources: notes ? notes.items : undefined,
    riskAssessment: input.riskAssessment,
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
