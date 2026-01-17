import { ActionableGuide } from "@/types/ai";

export const sadness_guide: ActionableGuide = {
  id: "sadness_guide",
  guideTitle: "Taller emocional: Tristeza",
  emotionId: "tristeza",
  tags: ["tristeza", "duelo", "apoyo", "validacion", "cuidado"],
  sections: [
    {
      kind: "understanding",
      title: "Que es la tristeza?",
      content:
        "La tristeza aparece cuando perdemos algo, algo no sale como esperabamos o necesitamos descanso. Nos invita a pausar y recibir cuidado.",
    },
    {
      kind: "normalization",
      title: "Normalizar",
      bullets: [
        "Sentirse triste no es debilidad.",
        "A veces se siente como pesadez, ganas de llorar o poco interes.",
        "Concompanado, el cuerpo puede soltar esa carga.",
      ],
    },
    {
      kind: "metaphor",
      title: "Lectura simbolica",
      content:
        "La tristeza es como lluvia suave: moja y enfria, pero tambien limpia. Necesita tiempo y abrigo, no prisa.",
    },
    {
      kind: "language",
      title: "Lenguaje para acompanar",
      phrases: [
        "Estoy contigo.",
        "Podemos llorar un rato si quieres.",
        "No tienes que estar bien ahora.",
        "Gracias por contarme.",
      ],
      questions: [
        "Que es lo que mas te duele?",
        "Quieres un abrazo o prefieres espacio?",
        "Que te ayudaria hoy para sentirte mejor?",
      ],
    },
    {
      kind: "strategies",
      title: "En el momento",
      items: [
        "Ofrece presencia silenciosa.",
        "Valida sin apurar: Tiene sentido.",
        "Invita a respirar lento y profundo.",
      ],
    },
    {
      kind: "strategies",
      title: "Despues",
      items: [
        "Nombrar: Esto fue tristeza.",
        "Conectar con un recuerdo bueno.",
        "Pequena accion de cuidado: agua, manta, dibujo.",
      ],
    },
    {
      kind: "strategies",
      title: "Entrenamiento en calma (2-3 minutos)",
      items: [
        "Respiracion con manos en el pecho.",
        "Dibujar la lluvia y el arcoiris.",
        "Carta breve a lo que se extrana.",
      ],
    },
    {
      kind: "practice",
      title: "Respiracion abrazo (60-90s)",
      description:
        "Colocar manos en el pecho. Inhalar 3, exhalar 4. Repetir 4 veces sintiendo el calor de las manos.",
      materials: "Ninguno (opcional: manta).",
    },
    {
      kind: "reflection",
      title: "Reflexion adulta",
      prompts: [
        "Pude escuchar sin intentar arreglar?",
        "Que me costaba validar?",
        "Que gesto de cuidado funciono mejor?",
      ],
    },
    {
      kind: "notes",
      title: "Notas",
      items: [
        "Evita distraer para cortar el llanto.",
        "La tristeza necesita tiempo y contacto seguro.",
        "No forzar alegria inmediata.",
      ],
    },
  ],
};
