import { z } from "zod";

export const emotionClassSchema = z.object({
  schema_version: z.string().optional(),
  emotion: z.enum([
    "miedo",
    "ira",
    "tristeza",
    "verguenza",
    "celos",
    "alegria",
    "calma",
  ]),
  confidence: z.number().min(0).max(1).optional(),
  reasoning: z.string().optional(),
});
