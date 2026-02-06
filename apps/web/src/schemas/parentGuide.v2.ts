import { z } from "zod";

const understandingSection = z.object({
  kind: z.literal("understanding"),
  title: z.string().min(1),
  content: z.string().min(1),
});

const normalizationSection = z.object({
  kind: z.literal("normalization"),
  title: z.string().optional(),
  bullets: z.array(z.string().min(1)).min(1),
});

const metaphorSection = z.object({
  kind: z.literal("metaphor"),
  title: z.string().min(1),
  content: z.string().min(1),
});

const languageSection = z.object({
  kind: z.literal("language"),
  title: z.string().min(1),
  phrases: z.array(z.string().min(1)).min(1),
  questions: z.array(z.string().min(1)).optional(),
});

const practiceSection = z.object({
  kind: z.literal("practice"),
  title: z.string().min(1),
  description: z.string().min(1),
  materials: z.string().optional(),
});

const strategiesSection = z.object({
  kind: z.literal("strategies"),
  title: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
});

const reflectionSection = z.object({
  kind: z.literal("reflection"),
  title: z.string().min(1),
  prompts: z.array(z.string().min(1)).min(1),
});

const notesSection = z.object({
  kind: z.literal("notes"),
  title: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
});

const parentGuideSectionSchema = z.discriminatedUnion("kind", [
  understandingSection,
  normalizationSection,
  metaphorSection,
  languageSection,
  practiceSection,
  strategiesSection,
  reflectionSection,
  notesSection,
]);

const baseParentGuideV2Schema = z
  .object({
    schema_version: z.literal("parent_guide.v2"),
    id: z.string().min(1),
    guideTitle: z.string().min(1),
    emotion: z.string().min(1),
    tags: z.array(z.string().min(1)).default([]),
    sections: z.array(parentGuideSectionSchema).min(1),
    riskAssessment: z
      .object({
        riskLevel: z.enum(["normal", "attention", "professional_required"]),
        confidence: z.number(),
        reasoning: z.string().min(1),
        derivationNote: z.string().min(1).optional(),
      })
      .optional(),
    characterId: z.string().optional(),
  })
  .passthrough();

export const parentGuideV2Schema = baseParentGuideV2Schema.superRefine(
  (val, ctx) => {
    const kinds = new Set(val.sections.map((s) => s.kind));
    const required: Array<typeof val.sections[number]["kind"]> = [
      "metaphor",
      "language",
      "practice",
    ];
    required.forEach((kind) => {
      if (!kinds.has(kind)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["sections"],
          message: `Missing required section: ${kind}`,
        });
      }
    });
  }
);

export type ParentGuideV2 = z.infer<typeof parentGuideV2Schema>;
