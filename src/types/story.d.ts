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
    choices?: { id: string; icon: string; label: string }[];
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
  guideId: string;
  description: string;
  coverImage?: string;
  category?: "breathing" | "emotions" | "focus" | "sleep";
  initialStepId: string;
  steps: JourneyStep[];
}
