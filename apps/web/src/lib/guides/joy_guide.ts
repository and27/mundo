import { ActionableGuide } from "@/types/ai";

export const joy_guide: ActionableGuide = {
  id: "joy_guide",
  guideTitle: "Taller emocional: Alegria y Optimismo",
  emotionId: "alegria",
  tags: ["alegria", "optimismo", "gratitud", "energia", "celebrar"],
  sections: [
    {
      kind: "understanding",
      title: "Que es la alegria?",
      content:
        "La alegria aparece cuando algo nos gusta, nos sale bien o nos sentimos conectados. Nos da energia para compartir y crear.",
    },
    {
      kind: "normalization",
      title: "Normalizar",
      bullets: [
        "La alegria tambien necesita cuidado para no volverse desborde.",
        "Puede sentirse como cosquilleo, ganas de saltar o reir.",
        "Celebrar nos ayuda a recordar lo bueno.",
      ],
    },
    {
      kind: "metaphor",
      title: "Lectura simbolica",
      content:
        "La alegria es como un sol suave: calienta y da energia. Si la compartimos, ilumina mas.",
    },
    {
      kind: "language",
      title: "Lenguaje para acompanar",
      phrases: [
        "Que bonito verte asi.",
        "Gracias por compartir tu alegria.",
        "Hagamos un recuerdo de este momento.",
      ],
      questions: [
        "Que fue lo mejor de hoy?",
        "Con quien te gustaria compartirlo?",
        "Que podemos repetir manana?",
      ],
    },
    {
      kind: "strategies",
      title: "En el momento",
      items: [
        "Poner nombre a lo positivo.",
        "Celebracion breve: aplauso, abrazo o baile corto.",
        "Respirar juntos para bajar un poco el ritmo si es necesario.",
      ],
    },
    {
      kind: "strategies",
      title: "Despues",
      items: [
        "Guardar el recuerdo: dibujo o frase.",
        "Agradecer a alguien.",
        "Conectar alegria con esfuerzo: Lo lograste porque ___.",
      ],
    },
    {
      kind: "strategies",
      title: "Entrenamiento en calma (2-3 minutos)",
      items: [
        "Frasco de gratitud: 1 cosa buena al dia.",
        "Calendario de pequenos logros.",
        "Respiracion sonrisa: inhalar, exhalar con sonrisa suave.",
      ],
    },
    {
      kind: "practice",
      title: "Respiracion sol (60-90s)",
      description:
        "Inhalar 3 como si el sol llenara el pecho, exhalar 4 soltando una sonrisa. Repetir 4 veces.",
      materials: "Ninguno.",
    },
    {
      kind: "reflection",
      title: "Reflexion adulta",
      prompts: [
        "Acompanamos la alegria sin minimizarla?",
        "Pude conectar el logro con el proceso?",
        "Como celebramos sin exceso?",
      ],
    },
    {
      kind: "notes",
      title: "Notas",
      items: [
        "Celebrar no es premiar todo.",
        "La alegria se fortalece con gratitud.",
        "Equilibrar energia con respiracion.",
      ],
    },
  ],
};
