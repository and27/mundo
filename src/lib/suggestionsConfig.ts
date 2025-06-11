import {
  Moon,
  Zap,
  AlertTriangle,
  School,
  Users,
  Heart,
  Eye,
  Home,
  Bed,
  MessageCircle,
  LucideIcon,
} from "lucide-react";

export interface SuggestionConfig {
  text: string;
  icon: LucideIcon;
  category: "miedos" | "ira" | "general";
  severity?: "normal" | "concern" | "alert";
}

export const SUGGESTION_CONFIGS: Record<string, SuggestionConfig[]> = {
  miedos: [
    {
      text: "Mi hijo tiene pesadillas frecuentes y no quiere dormir solo",
      icon: Moon,
      category: "miedos",
      severity: "normal",
    },
    {
      text: "Miedo extremo a la oscuridad, llora cuando apago la luz",
      icon: Bed,
      category: "miedos",
      severity: "normal",
    },
    {
      text: "Pánico al ir al colegio, dice que le duele el estómago",
      icon: School,
      category: "miedos",
      severity: "concern",
    },
    {
      text: "Mi hijo tiene miedo a quedarse con otros adultos",
      icon: Users,
      category: "miedos",
      severity: "concern",
    },
    {
      text: "Miedo a ciertos familiares o cuidadores",
      icon: Eye,
      category: "miedos",
      severity: "alert",
    },
    {
      text: "Se esconde cuando llegan visitas a casa",
      icon: Home,
      category: "miedos",
      severity: "concern",
    },
  ],

  ira: [
    {
      text: "Rabietas intensas cuando no consigue lo que quiere",
      icon: Zap,
      category: "ira",
      severity: "normal",
    },
    {
      text: "Se frustra fácilmente con tareas escolares y las abandona",
      icon: AlertTriangle,
      category: "ira",
      severity: "normal",
    },
    {
      text: "Explosiones de ira en lugares públicos",
      icon: Users,
      category: "ira",
      severity: "concern",
    },
    {
      text: "Agresividad física: pega, muerde o lanza objetos",
      icon: Zap,
      category: "ira",
      severity: "concern",
    },
    {
      text: "Ira dirigida hacia padres o hermanos específicamente",
      icon: Heart,
      category: "ira",
      severity: "concern",
    },
    {
      text: "No puede calmarse después de episodios de ira",
      icon: AlertTriangle,
      category: "ira",
      severity: "concern",
    },
  ],

  general: [
    {
      text: "Mi hijo tiene pesadillas y rabietas frecuentes",
      icon: MessageCircle,
      category: "general",
      severity: "normal",
    },
    {
      text: "Problemas de comportamiento en casa y colegio",
      icon: MessageCircle,
      category: "general",
      severity: "normal",
    },
    {
      text: "Cambios súbitos en el comportamiento de mi hijo",
      icon: MessageCircle,
      category: "general",
      severity: "concern",
    },
    {
      text: "No sé cómo ayudar a mi hijo con sus emociones",
      icon: MessageCircle,
      category: "general",
      severity: "normal",
    },
  ],
};

// Helper function to get suggestions by category
export const getSuggestionsByCategory = (
  category: keyof typeof SUGGESTION_CONFIGS
): SuggestionConfig[] => {
  return SUGGESTION_CONFIGS[category] || SUGGESTION_CONFIGS.general;
};

// Helper function to get mixed suggestions (prioritizing miedos/ira)
export const getMixedSuggestions = (count: number = 4): SuggestionConfig[] => {
  const miedosTop = SUGGESTION_CONFIGS.miedos.slice(0, 2);
  const iraTop = SUGGESTION_CONFIGS.ira.slice(0, 2);
  return [...miedosTop, ...iraTop].slice(0, count);
};

// Helper function to detect potential red flags
export const getAlertSuggestions = (): SuggestionConfig[] => {
  return Object.values(SUGGESTION_CONFIGS)
    .flat()
    .filter((suggestion) => suggestion.severity === "alert");
};

// Helper function for normal vs concerning situations
export const getSuggestionsBySeverity = (
  severity: "normal" | "concern" | "alert"
): SuggestionConfig[] => {
  return Object.values(SUGGESTION_CONFIGS)
    .flat()
    .filter((suggestion) => suggestion.severity === severity);
};
