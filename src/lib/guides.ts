import { ActionableGuide } from "@/types/ai";
import { anger_guide } from "@/lib/guides/anger_guide";
import { fear_guide } from "@/lib/guides/fear_guide";
import { sadness_guide } from "@/lib/guides/sadness_guide";
import { joy_guide } from "@/lib/guides/joy_guide";
import { jealousy_guide } from "@/lib/guides/jealousy_guide";
import { shame_guide } from "@/lib/guides/shame_guide";

export const guides: Record<string, ActionableGuide> = {
  anger_guide,
  fear_guide,
  sadness_guide,
  joy_guide,
  jealousy_guide,
  shame_guide,
};
