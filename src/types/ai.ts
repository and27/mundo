export type EmotionId =
  | "ira"
  | "miedo"
  | "tristeza"
  | "verguenza"
  | "celos"
  | "alegria";

export type CharacterId = "yachay" | "amaru";

export interface RiskAssessment {
  riskLevel: "normal" | "attention" | "professional_required";
  confidence: number; // 0.1 - 1.0
  reasoning: string;
  derivationNote?: string;
}

export type ParentGuideSection =
  | { kind: "understanding"; title: string; content: string }
  | { kind: "normalization"; title?: string; bullets: string[] }
  | { kind: "metaphor"; title: string; content: string }
  | {
      kind: "language";
      title: string;
      phrases: string[];
      questions?: string[];
    }
  | {
      kind: "practice";
      title: string;
      description: string;
      materials?: string;
    }
  | { kind: "strategies"; title: string; items: string[] }
  | { kind: "reflection"; title: string; prompts: string[] }
  | { kind: "notes"; title: string; items: string[] };

/**
 * ActionableGuide = Guia de acompanamiento ADULTO (no es el cuento).
 * Se usa en Programa y en generacion personalizada.
 */
export interface ActionableGuide {
  id: string;
  guideTitle: string;
  emotionId?: EmotionId;
  tags: string[];
  riskAssessment?: RiskAssessment;
  sections?: ParentGuideSection[];
  character?: string;
}

/**
 * "SavedGuide" aqui es confuso por nombre, pero lo dejo porque ya lo usas.
 * Representa una guia adulta + el personaje seleccionado para el cuento.
 */
export type SavedGuide = ActionableGuide & {
  characterId: CharacterId;
};

/** Alias por compatibilidad con componentes existentes */
export type GuideWithCharacter = SavedGuide;
