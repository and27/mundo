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
    nextStepId: string;
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

export const stories: Story[] = [
  {
    id: "hatun",
    title: "La Calma de la Tortuga",
    guideId: "hatun",
    description:
      "Aprende a encontrar tu ritmo lento y tranquilo con la Abuela Tortuga.",
    coverImage: "/covers/tortuga_cover.png",
    category: "breathing",
    initialStepId: "j1_intro",
    steps: [
      {
        id: "j1_intro",
        audioSrc: "/audio/journey1/j1_intro.mp3",
        subtitle:
          "¿Oyes cómo canta el agua? Chuuu... baja rápido por la montaña... A veces, lleva hojitas secas, se mueve mucho entre las piedras... Y aquí adentro... nuestros pensamientos también pueden correr así, un poquito apurados, ¿cierto? Pero hasta el río más juguetón encuentra su calma. Yo conozco un secreto... ¿Quieres que busquemos juntos ese lugar tranquilo?",
        visuals: {
          type: "scene",
          backgroundImage: "/images/journey1/stream_bg.png",
        },
        interaction: { type: "auto_proceed", nextStepId: "j1_breathing" },
        isNarration: true,
      },
      {
        id: "j1_breathing",
        audioSrc: "/audio/journey1/j1_breathing.mp3",
        subtitle:
          "Muy bien... Ahora, respira conmigo... muy lento... como una tortuga. Toma aire suavecito por tu nariz... siente cómo llena tu pancita... Y ahora, bota el aire despacito por tu boca... shhhh... Otra vez... Toma aire despacio... Suelta el aire suavemente... Una última vez, bien profundo... Aire adentro... Aire afuera... ¡Eso es! Muy bien...",
        visuals: {
          type: "breathing",
          breathingCueType: "pulse_circle",
          backgroundImage: "/images/journey1/stream_bg_soft.png",
        },
        interaction: { type: "auto_proceed", nextStepId: "j1_prompt" },
        isNarration: true,
      },
      {
        id: "j1_prompt",
        audioSrc: "/audio/journey1/j1_prompt.mp3",
        subtitle:
          "Y ahora... después de respirar como la Abuela Tortuga... ¿cómo te sientes por dentro? Toca la palabra que se parece más a tu sentir ahora.",
        visuals: {
          type: "choice",
          backgroundImage: "/images/journey1/stream_bg.png",
          choices: [
            {
              id: "choice_tranquilo",
              icon: "/images/icons/leaf.png",
              label: "Tranquilo/a",
            },
            {
              id: "choice_calmado",
              icon: "/images/icons/rock.png",
              label: "Calmado/a",
            },
            {
              id: "choice_lento",
              icon: "/images/icons/snail.png",
              label: "Lento/a",
            },
          ],
        },
        interaction: {
          type: "wait_for_tap",
          tappableTarget: "choice",
          nextStepId: "j1_feedback",
        },
        isNarration: true,
      },
      {
        id: "j1_feedback",
        audioSrc: "/audio/journey1/j1_feedback.mp3",
        subtitle:
          "Ajá... Qué bien se siente encontrar esa pausa, ¿verdad? Recuerda siempre este secreto: como la tortuga busca su roca... tú siempre puedes usar tu respiración lenta y tranquila para encontrar tu propia calma...",
        visuals: {
          type: "scene",
          backgroundImage: "/images/journey1/stream_bg_soft.png",
        },
        interaction: { type: "auto_proceed", nextStepId: "j1_outro" },
        isNarration: true,
      },
      {
        id: "j1_outro",
        audioSrc: "/audio/journey1/j1_outro.mp3",
        visuals: { type: "scene", text: "¡La calma de la tortuga vive en ti!" },
        interaction: { type: "auto_proceed", nextStepId: "end" },
        isNarration: true,
      },
    ],
  },
  {
    id: "pajaro",
    title: "El Vuelo Valiente",
    guideId: "pajaro",
    description:
      "Acompaña a un personaje que teme a la oscuridad a encontrar su luz.",
    coverImage: "/covers/pajaro_cover.png",
    category: "emotions",
    initialStepId: "j2_start",
    steps: [],
  },
  {
    id: "amaru",
    title: "El Río de Emociones",
    guideId: "amaru",
    description: "Navega por diferentes sentimientos que fluyen dentro de ti.",
    coverImage: "/covers/amaru_cover.png",
    category: "emotions",
    initialStepId: "j3_start",
    steps: [],
  },
  {
    id: "yachay",
    title: "La Pausa del Puma Sabio",
    guideId: "yachay",
    description: "Observa cómo la pausa puede ayudar cuando algo es difícil.",
    coverImage: "/covers/yachay_cover.png",
    category: "focus",
    initialStepId: "j4_start",
    steps: [],
  },
  {
    id: "hatun",
    title: "Un Abrazo para Ti",
    guideId: "hatun",
    description:
      "Aprende a tratarte con amabilidad, como lo haría la Abuela Tortuga.",
    coverImage: "/covers/tortuga_cover2.png",
    category: "emotions",
    initialStepId: "j5_start",
    steps: [],
  },
];
