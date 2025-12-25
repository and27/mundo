/**
 * MODELOS DE RUNTIME — EXPERIENCIA NIÑO
 *
 * Representan historias listas para ser reproducidas
 * por el Story Player (audio + visual + interacción).
 *
 *  No contienen guías adultas ni lógica de generación IA.
 */

export interface JourneyStep {
  id: string;
  audioSrc: string;
  subtitle?: string;
  visuals: {
    type: "scene" | "breathing" | "choice" | "game";
    text?: string;
    backgroundImage?: string;
    foregroundImage?: string;
    breathingCueType?: "pulse_circle" | "expand_contract";
    choices?: { id: string; icon?: string | undefined; label: string }[];
    gameComponentId?: string;
  };
  interaction: {
    type: "auto_proceed" | "wait_for_tap";
    tappableTarget?: string;
    nextStepId?: string;
    branching?: {
      choiceId: string;
      nextStepId: string;
    }[];
    defaultNextStepId?: string | null;
  };
  isNarration?: boolean;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  category?: "breathing" | "emotions" | "focus" | "sleep";
  guideId: string;
  coverImage?: string;
  initialStepId: string;
  steps: JourneyStep[];
}

export type ChildStory = Story;
