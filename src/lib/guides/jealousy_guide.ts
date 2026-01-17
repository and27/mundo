import { ActionableGuide } from "@/types/ai";

export const jealousy_guide: ActionableGuide = {
  id: "jealousy_guide",
  guideTitle: "Taller emocional: Celos y Comparaciones",
  emotionId: "celos",
  tags: ["celos", "comparacion", "inseguridad", "autoestima", "vinculo"],
  sections: [
    {
      kind: "understanding",
      title: "Que son los celos?",
      content:
        "Los celos aparecen cuando sentimos amenaza de perder atencion o afecto. Suelen esconder miedo y necesidad de seguridad.",
    },
    {
      kind: "normalization",
      title: "Normalizar",
      bullets: [
        "Es normal sentirse inseguro a veces.",
        "Los celos no son malos; nos dicen que necesitamos sentirse vistos.",
        "Compararse no define nuestro valor.",
      ],
    },
    {
      kind: "metaphor",
      title: "Lectura simbolica",
      content:
        "Los celos son como un espejo que se nubla: vemos menos lo nuestro. Al limpiar el espejo, recordamos nuestro valor.",
    },
    {
      kind: "language",
      title: "Lenguaje para acompanar",
      phrases: [
        "Veo que quieres atencion.",
        "Tu lugar es importante para mi.",
        "No estamos compitiendo, estamos juntos.",
      ],
      questions: [
        "Que necesitas para sentirte mas seguro?",
        "Que es lo que temes perder?",
        "Que te gustaria pedir con calma?",
      ],
    },
    {
      kind: "strategies",
      title: "En el momento",
      items: [
        "Valida la necesidad: Quieres ser visto.",
        "Marca limites sin castigo.",
        "Ofrece una accion concreta: 5 minutos juntos.",
      ],
    },
    {
      kind: "strategies",
      title: "Despues",
      items: [
        "Nombrar: Esto fue celos.",
        "Reforzar pertenencia: Tu lugar es unico.",
        "Buscar una peticion clara para la proxima vez.",
      ],
    },
    {
      kind: "strategies",
      title: "Entrenamiento en calma (2-3 minutos)",
      items: [
        "Lista de fortalezas propias.",
        "Tiempo especial uno a uno.",
        "Respiracion 4-4 con mano en el pecho.",
      ],
    },
    {
      kind: "practice",
      title: "Respiracion espejo (60-90s)",
      description:
        "Inhalar 4 contando, exhalar 4. Al exhalar, decir en voz baja: soy importante.",
      materials: "Ninguno (opcional: espejo).",
    },
    {
      kind: "reflection",
      title: "Reflexion adulta",
      prompts: [
        "Valide la necesidad sin reforzar comparacion?",
        "Como cuide el vinculo entre hermanos?",
        "Que rutina de tiempo especial puedo sostener?",
      ],
    },
    {
      kind: "notes",
      title: "Notas",
      items: [
        "Evitar etiquetas: celoso no define al nino.",
        "Comparar aumenta inseguridad.",
        "La seguridad baja los celos.",
      ],
    },
  ],
};
