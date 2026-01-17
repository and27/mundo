import { ActionableGuide } from "@/types/ai";

export const shame_guide: ActionableGuide = {
  id: "shame_guide",
  guideTitle: "Taller emocional: Verguenza",
  emotionId: "verguenza",
  tags: ["verguenza", "autoimagen", "cuidado", "reparacion", "confianza"],
  sections: [
    {
      kind: "understanding",
      title: "Que es la verguenza?",
      content:
        "La verguenza aparece cuando creemos que hicimos algo mal o que los demas nos juzgan. Necesita respeto y cuidado.",
    },
    {
      kind: "normalization",
      title: "Normalizar",
      bullets: [
        "Todos nos equivocamos.",
        "Sentir verguenza no significa ser malo.",
        "Se alivia con empatia y reparacion.",
      ],
    },
    {
      kind: "metaphor",
      title: "Lectura simbolica",
      content:
        "La verguenza es como esconderse bajo una manta. Cuando alguien nos acompana sin juzgar, podemos salir despacio.",
    },
    {
      kind: "language",
      title: "Lenguaje para acompanar",
      phrases: [
        "Te equivocas y sigues siendo valioso.",
        "Estoy aqui, no te dejo solo.",
        "Podemos reparar juntos.",
      ],
      questions: [
        "Que fue lo mas dificil para ti?",
        "Que te haria sentir mejor ahora?",
        "Como podemos arreglarlo?",
      ],
    },
    {
      kind: "strategies",
      title: "En el momento",
      items: [
        "Bajar la mirada y el tono, dar privacidad.",
        "Validar sin exponer: Entiendo que te dio pena.",
        "Evitar burlas o sermones.",
      ],
    },
    {
      kind: "strategies",
      title: "Despues",
      items: [
        "Separar conducta de identidad.",
        "Definir reparacion concreta.",
        "Recordar fortalezas del nino.",
      ],
    },
    {
      kind: "strategies",
      title: "Entrenamiento en calma (2-3 minutos)",
      items: [
        "Frase segura: No soy mi error.",
        "Respiracion lenta con manos en el abdomen.",
        "Practicar pedir disculpas con respeto.",
      ],
    },
    {
      kind: "practice",
      title: "Respiracion manta (60-90s)",
      description:
        "Inhalar 3, exhalar 4. Imaginar una manta que abriga y protege. Repetir 4 veces.",
      materials: "Ninguno (opcional: manta real).",
    },
    {
      kind: "reflection",
      title: "Reflexion adulta",
      prompts: [
        "Evite usar verguenza como castigo?",
        "Pude dar espacio sin abandonar?",
        "Como modelo la reparacion con respeto?",
      ],
    },
    {
      kind: "notes",
      title: "Notas",
      items: [
        "No etiquetar: vergonzoso.",
        "La reparacion repara el vinculo.",
        "La empatia reduce la verguenza.",
      ],
    },
  ],
};
