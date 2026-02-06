import { z } from "zod";
import { parentGuideV1Schema } from "@/schemas/parentGuide.v1";
import { parentGuideV2Schema } from "@/schemas/parentGuide.v2";
import { emotionClassSchema } from "@/schemas/emotionClass";

export type LlmSchemaVersion =
  | "parent_guide.v1"
  | "parent_guide.v2"
  | "emotion_class";

const schemaRegistry: Record<LlmSchemaVersion, z.ZodSchema> = {
  "parent_guide.v1": parentGuideV1Schema,
  "parent_guide.v2": parentGuideV2Schema,
  emotion_class: emotionClassSchema,
};

export function getSchemaForVersion(version: string): z.ZodSchema | null {
  if (version in schemaRegistry) {
    return schemaRegistry[version as LlmSchemaVersion];
  }
  return null;
}
