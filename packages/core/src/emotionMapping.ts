import type { EmotionId } from "./types/ai";

const BASE_EMOTIONS: EmotionId[] = [
  "miedo",
  "ira",
  "tristeza",
  "verguenza",
  "celos",
  "alegria",
  "calma",
];

const KEYWORDS: Record<EmotionId, string[]> = {
  ira: [
    "frustrado",
    "frustracion",
    "frustración",
    "distante",
    "agresivo",
    "hostil",
    "enfurecido",
    "rabioso",
    "provocado",
    "provocacion",
    "provocación",
    "irritado",
    "enfadado",
    "resentido",
    "violado",
    "desquiciado",
    "colera",
    "furia",
    "ira",
  ],
  tristeza: [
    "abandonado",
    "desesperado",
    "deprimido",
    "solitario",
    "vacio",
    "inferior",
    "vulnerable",
    "impotente",
    "discriminado",
    "apartado",
    "apatico",
    "aburrido",
    "aburrimiento",
    "indiferente",
    "ansioso",
    "tristeza",
    "triste",
  ],
  miedo: [
    "angustia",
    "ansiedad",
    "ansioso",
    "aprension",
    "aprehension",
    "cobardia",
    "desasosiego",
    "inquietud",
    "intranquilidad",
    "panico",
    "pavor",
    "recelo",
    "temor",
    "apremio",
    "amenaza",
    "amenazado",
    "obligacion",
    "miedo",
    "confusion",
    "desconcierto",
    "aturdimiento",
    "estupefaccion",
    "conflictuado",
    "sorpresa",
    "intriga",
  ],
  verguenza: [
    "culpa",
    "remordimiento",
    "arrepentimiento",
    "bochorno",
    "turbacion",
    "aburrimiento",
    "vergüenza",
    "verguenza",
  ],
  celos: [
    "celos",
    "celoso",
    "celo",
    "envidia",
    "comparacion",
    "posesivo",
    "inseguro",
    "inseguridad",
  ],
  alegria: [
    "alegria",
    "felicidad",
    "placer",
    "entusiasmo",
    "fervor",
    "satisfaccion",
    "orgullo",
    "gozo",
    "regocijo",
    "alborozo",
    "animacion",
    "pasión",
    "pasion",
    "agradecimiento",
    "solaz",
  ],
  calma: [
    "calma",
    "paz",
    "serenidad",
    "tranquilidad",
    "compasion",
    "compasión",
    "gratitud",
    "ternura",
    "alivio",
    "bienestar",
    "armonía",
    "armonia",
  ],
};

export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function mapEmotionLabel(value?: string): EmotionId | undefined {
  if (!value) return undefined;
  const normalized = normalizeText(value);

  const exact = BASE_EMOTIONS.find((e) => e === normalized);
  if (exact) return exact;

  const matchesKeyword = (text: string, keyword: string) => {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`\\b${escaped}\\b`, "i");
    return pattern.test(text);
  };

  for (const base of BASE_EMOTIONS) {
    const matches = KEYWORDS[base].some((word) =>
      matchesKeyword(normalized, normalizeText(word))
    );
    if (matches) return base;
  }

  return undefined;
}
