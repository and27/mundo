/**
 * Tipos exclusivos para la **fase de generación** (prompt → JSON).
 * No colisiona con los tipos de reproducción (`JourneyStep`, `Story`)
 * porque mantiene los campos específicos de creación (prompt_img, etc.).
 * Autor: Mundo Interior · v1 (Jul 2025)
 */

/* ---------- BLOQUES Y ENUMS AUXILIARES ---------- */

export type BlockName =
  | "gancho"
  | "encuentro"
  | "tecnica"
  | "giro_empatico"
  | "sub_conflicto"
  | "integracion"
  | "resolucion"
  | "cierre_poetico"
  | "cierre_ritual";

export type InteractionType = "auto_proceed" | "wait_for_tap";

export type VisualType = "scene" | "breathing" | "choice" | "game";

/* ---------- STEP ---------- */

export interface PromptStoryStep {
  id: string; //identificador único (scene_1)
  block: BlockName; //bloque narrativo (ej: giro)
  subtitle: string;
  prompt_img: string;
  audioSrc?: string;
  isNarration?: boolean;
  visuals?: {
    type?: VisualType;
    backgroundImage?: string;
    foregroundImage?: string;
    breathingCueType?: "pulse_circle" | "expand_contract";
    choices?: { id: string; label: string; icon?: string }[];
    /** Para minijuegos embebidos. */
    gameComponentId?: string;
  };

  interaction?: {
    type: InteractionType;
    nextStepId?: string /** Para auto_proceed. */;
    /** Para wait_for_tap + branching. */
    branching?: { choiceId: string; nextStepId: string }[];
    defaultNextStepId?: string | null;
    tappableTarget?: string;
  };

  /** Estimación (seg) → útil para sincronizar audio. */
  duration_estimate_sec?: number;
}

/* ---------- STORY (SALIDA DEL MODELO) ---------- */

export interface PromptGeneratedStory {
  id: string;
  title: string;
  description: string;
  /** “emotions”, “breathing”, etc. */
  category: string;
  age_group?: string;
  /** Formato narrativo: semilla | sendero | ceremonia */
  format: "semilla" | "sendero" | "ceremonia";
  /** Técnicas SEL usadas; coincide con inventario. */
  techniques: string[];
  guideId: string;
  initialStepId: string;
  coverImage?: string;
  steps: PromptStoryStep[];
}

export interface StoryPromptOptions {
  storyId: string;
  emotion: string;
  character: string;
  format?: "semilla" | "sendero" | "ceremonia";
  ageGroup?: "0-3" | "4-6" | "7-9" | "10-12" | "13-15";
  techniquePrimary: string;
  techniqueSecondary?: string | null;
}
