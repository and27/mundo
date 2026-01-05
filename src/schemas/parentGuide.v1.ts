import { z } from "zod";

export const parentGuideV1Schema = z
  .object({
    schema_version: z.string().optional(),
    id: z.string().min(1),
    guideTitle: z.string().min(1),
    emotion: z.string().min(1),
    metaphorStory: z.string().min(1),
    conversationPlan: z.object({
      questionsToExplore: z.array(z.string().min(1)).min(1),
      phrasesToValidate: z.array(z.string().min(1)).min(1),
    }),
    suggestedActivity: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      materials: z.string().min(1),
    }),
    tags: z.array(z.string().min(1)).default([]),
    riskAssessment: z
      .object({
        riskLevel: z.enum(["normal", "attention", "professional_required"]),
        confidence: z.number(),
        reasoning: z.string().min(1),
        derivationNote: z.string().min(1).optional(),
      })
      .optional(),
  })
  .passthrough();

export type ParentGuideV1 = z.infer<typeof parentGuideV1Schema>;
