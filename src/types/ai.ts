import { Emotion } from "@/lib/emotionsData";

/** Si Emotion es un objeto, idealmente guardamos solo el id */
export type EmotionId = "ira" | "miedo" | "tristeza" | "vergüenza"; // si luego agregas: | "alegria" | "celos"

export type CharacterId = "yachay" | "amaru"; // luego agregas más

export interface ActivityGuideline {
  id: string;
  title: string;
  description: string;
  linkToDetail: string;
  type: string;
  emotionalActivityId?: string;
  emotionalActivityPreview?: string;
  imageUrl?: string;
  tags?: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text?: string;
  resources?: ActivityGuideline[];
  timestamp: number;
}

/**
 * Pilar: Lenguaje empático / conversación
 */
export interface ConversationPlanner {
  questionsToExplore: string[];
  phrasesToValidate: string[];
}

/**
 * Pilar: Práctica somática / acción simple offline
 */
export interface ActivitySuggestion {
  title: string;
  description: string;
  materials: string;
}

export interface RiskAssessment {
  riskLevel: "normal" | "attention" | "professional_required";
  confidence: number; // 0.1 - 1.0
  reasoning: string;
  derivationNote?: string;
}

/**
 * ActionableGuide = Guía de acompañamiento ADULTO (no es el cuento).
 * Se usa en Programa y en generación personalizada.
 */
export interface ActionableGuide {
  id: string;
  guideTitle: string;

  /**
   * Backward compatible:
   * - Si hoy ya guardas emotion como objeto, déjalo.
   * - Pero añade emotionId para que el DTO sea estable.
   */
  emotion?: Emotion; // legacy / UI-friendly si ya lo tienes
  emotionId?: EmotionId; // recomendado para DB / referencias

  tags: string[];

  /** 1. Comprender la emoción (tipo Elsa: qué es / para qué sirve) */
  understanding?: {
    title: string;
    content: string;
  };

  /** 2. Normalizar (validación + “es normal sentir…”) */
  normalization?: string[];

  /** 3. Lectura simbólica (metáfora central del cuento/programa) */
  metaphorStory: string;

  /** 4. Lenguaje (validación + preguntas) */
  conversationPlan: ConversationPlanner;

  /** 5. Estrategias prácticas (en calma) */
  strategies?: {
    title: string;
    items: string[];
  }[];

  /** 6. Práctica somática (en el momento) */
  suggestedActivity: ActivitySuggestion;

  /** 7. Reflexión adulta (para integrar: “qué aprendí / qué haré distinto”) */
  reflectionPrompts?: string[];

  /**
   * 8. Observaciones rápidas / “tips”
   * Importante: NO meter aquí toda la metodología.
   */
  resources?: string[];

  riskAssessment?: RiskAssessment;
}

/**
 * “SavedGuide” aquí es confuso por nombre, pero lo dejo porque ya lo usas.
 * Representa una guía adulta + el personaje seleccionado para el cuento.
 */
export type SavedGuide = ActionableGuide & {
  characterId: CharacterId;
};

/** Alias por compatibilidad con componentes existentes */
export type GuideWithCharacter = SavedGuide;
