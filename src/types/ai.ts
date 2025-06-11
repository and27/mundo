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
 * Describe las frases y preguntas para guiar una conversación empática.
 * Pilar 2 de la Guía Accionable.
 */
export interface ConversationPlanner {
  questionsToExplore: string[];
  phrasesToValidate: string[];
}

/**
 * Describe la actividad offline sugerida para procesar la emoción.
 * Pilar 3 de la Guía Accionable.
 */
export interface ActivitySuggestion {
  title: string;
  description: string;
  materials: string;
}

/* Three piillar guide */
export interface ActionableGuide {
  id: string;
  guideTitle: string;
  metaphorStory: string;
  conversationPlan: ConversationPlanner;
  suggestedActivity: ActivitySuggestion;
  tags: string[];
  riskAssessment?: RiskAssessment;
}

export interface RiskAssessment {
  riskLevel: "normal" | "attention" | "professional_required";
  confidence: number; // 0.1 - 1.0
  reasoning: string;
  derivationNote?: string;
}
