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
  BookOpen,
  Clock,
  UserCheck,
  Target,
  LucideIcon,
} from "lucide-react";

export interface SuggestionConfig {
  text: string;
  icon: LucideIcon;
  category: "miedos" | "ira" | "general";
  severity?: "normal" | "concern" | "alert";
  audience?: "parent" | "educator" | "both";
}

export const SUGGESTION_CONFIGS: Record<string, SuggestionConfig[]> = {
  miedos: [
    {
      text: "Mi hijo tiene pesadillas frecuentes y no quiere dormir solo",
      icon: Moon,
      category: "miedos",
      severity: "normal",
      audience: "parent",
    },
    {
      text: "Miedo extremo a la oscuridad, llora cuando apago la luz",
      icon: Bed,
      category: "miedos",
      severity: "normal",
      audience: "parent",
    },
    {
      text: "Pánico al ir al colegio, dice que le duele el estómago",
      icon: School,
      category: "miedos",
      severity: "concern",
      audience: "both",
    },
    {
      text: "Mi hijo tiene miedo a quedarse con otros adultos",
      icon: Users,
      category: "miedos",
      severity: "concern",
      audience: "parent",
    },
    {
      text: "Miedo a ciertos familiares o cuidadores",
      icon: Eye,
      category: "miedos",
      severity: "alert",
      audience: "parent",
    },
    {
      text: "Se esconde cuando llegan visitas a casa",
      icon: Home,
      category: "miedos",
      severity: "concern",
      audience: "parent",
    },
    {
      text: "Varios estudiantes muestran ansiedad antes de los exámenes",
      icon: BookOpen,
      category: "miedos",
      severity: "normal",
      audience: "educator",
    },
    {
      text: "Niños que se niegan a participar por miedo a equivocarse",
      icon: Target,
      category: "miedos",
      severity: "normal",
      audience: "educator",
    },
    {
      text: "Estudiantes que lloran cuando sus padres los dejan",
      icon: Heart,
      category: "miedos",
      severity: "concern",
      audience: "educator",
    },
    {
      text: "Miedo grupal a presentaciones frente a la clase",
      icon: Users,
      category: "miedos",
      severity: "normal",
      audience: "educator",
    },
  ],
  ira: [
    {
      text: "Rabietas intensas cuando no consigue lo que quiere",
      icon: Zap,
      category: "ira",
      severity: "normal",
      audience: "parent",
    },
    {
      text: "Se frustra fácilmente con tareas escolares y las abandona",
      icon: AlertTriangle,
      category: "ira",
      severity: "normal",
      audience: "both",
    },
    {
      text: "Explosiones de ira en lugares públicos",
      icon: Users,
      category: "ira",
      severity: "concern",
      audience: "parent",
    },
    {
      text: "Agresividad física: pega, muerde o lanza objetos",
      icon: Zap,
      category: "ira",
      severity: "concern",
      audience: "both",
    },
    {
      text: "Ira dirigida hacia padres o hermanos específicamente",
      icon: Heart,
      category: "ira",
      severity: "concern",
      audience: "parent",
    },
    {
      text: "No puede calmarse después de episodios de ira",
      icon: AlertTriangle,
      category: "ira",
      severity: "concern",
      audience: "both",
    },
    {
      text: "Conflictos frecuentes entre compañeros en el recreo",
      icon: Users,
      category: "ira",
      severity: "normal",
      audience: "educator",
    },
    {
      text: "Estudiantes que explotan en ira cuando se les corrige",
      icon: Zap,
      category: "ira",
      severity: "concern",
      audience: "educator",
    },
    {
      text: "Comportamientos disruptivos durante transiciones de clase",
      icon: Clock,
      category: "ira",
      severity: "normal",
      audience: "educator",
    },
    {
      text: "Ira grupal cuando se cambian las rutinas establecidas",
      icon: AlertTriangle,
      category: "ira",
      severity: "normal",
      audience: "educator",
    },
  ],
  general: [
    {
      text: "Mi hijo tiene pesadillas y rabietas frecuentes",
      icon: MessageCircle,
      category: "general",
      severity: "normal",
      audience: "parent",
    },
    {
      text: "Problemas de comportamiento en casa y colegio",
      icon: MessageCircle,
      category: "general",
      severity: "normal",
      audience: "both",
    },
    {
      text: "Cambios súbitos en el comportamiento de mi hijo",
      icon: MessageCircle,
      category: "general",
      severity: "concern",
      audience: "parent",
    },
    {
      text: "No sé cómo ayudar a mi hijo con sus emociones",
      icon: MessageCircle,
      category: "general",
      severity: "normal",
      audience: "parent",
    },
    {
      text: "Dificultades grupales con cambios de rutina en el aula",
      icon: School,
      category: "general",
      severity: "normal",
      audience: "educator",
    },
    {
      text: "Varios estudiantes muestran problemas emocionales similares",
      icon: Users,
      category: "general",
      severity: "concern",
      audience: "educator",
    },
    {
      text: "Necesito estrategias para manejar emociones grupales",
      icon: UserCheck,
      category: "general",
      severity: "normal",
      audience: "educator",
    },
  ],
};

export const getSuggestionsByCategory = (
  category: keyof typeof SUGGESTION_CONFIGS
): SuggestionConfig[] => {
  return SUGGESTION_CONFIGS[category] || SUGGESTION_CONFIGS.general;
};

export const getMixedSuggestions = (count: number = 4): SuggestionConfig[] => {
  const miedosTop = SUGGESTION_CONFIGS.miedos.slice(0, 2);
  const iraTop = SUGGESTION_CONFIGS.ira.slice(0, 2);
  return [...miedosTop, ...iraTop].slice(0, count);
};

export const getSuggestionsByMode = (
  isSchoolMode: boolean,
  count: number = 4
): SuggestionConfig[] => {
  const targetAudience = isSchoolMode ? "educator" : "parent";

  const filteredSuggestions = Object.values(SUGGESTION_CONFIGS)
    .flat()
    .filter(
      (suggestion) =>
        suggestion.audience === targetAudience || suggestion.audience === "both"
    );

  const miedos = filteredSuggestions
    .filter((s) => s.category === "miedos")
    .slice(0, 2);
  const ira = filteredSuggestions
    .filter((s) => s.category === "ira")
    .slice(0, 2);

  const mixed = [...miedos, ...ira];

  if (mixed.length < count) {
    const general = filteredSuggestions.filter((s) => s.category === "general");
    mixed.push(...general.slice(0, count - mixed.length));
  }

  return mixed.slice(0, count);
};

export const getAlertSuggestions = (): SuggestionConfig[] => {
  return Object.values(SUGGESTION_CONFIGS)
    .flat()
    .filter((suggestion) => suggestion.severity === "alert");
};

export const getSuggestionsBySeverity = (
  severity: "normal" | "concern" | "alert"
): SuggestionConfig[] => {
  return Object.values(SUGGESTION_CONFIGS)
    .flat()
    .filter((suggestion) => suggestion.severity === severity);
};

export const getSuggestionsByAudience = (
  audience: "parent" | "educator" | "both"
): SuggestionConfig[] => {
  return Object.values(SUGGESTION_CONFIGS)
    .flat()
    .filter(
      (suggestion) =>
        suggestion.audience === audience || suggestion.audience === "both"
    );
};
