import type { ActionableGuide, ParentGuideSection } from "@/types/ai";

export function getGuideSections(guide: ActionableGuide): ParentGuideSection[] {
  return guide.sections ?? [];
}
