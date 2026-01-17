import { ActionableGuide } from "@/types/ai";

export const fear_guide: ActionableGuide = {
  id: "fear_guide",
  guideTitle: "Taller emocional: Miedo",
  emotionId: "miedo",
  tags: ["miedo", "seguridad", "calma", "respiracion", "confianza"],
  sections: [
    {
      kind: "understanding",
      title: "Que es el miedo?",
      content:
        "El miedo es una alarma que nos protege. Aparece cuando algo se siente incierto o peligroso. No es el enemigo: nos avisa que necesitamos apoyo, claridad o calma.",
    },
    {
      kind: "normalization",
      title: "Normalizar",
      bullets: [
        "Es normal sentir miedo cuando no sabemos que va a pasar.",
        "El miedo puede sentirse como nudo en la panza, respiracion corta o ganas de esconderse.",
        "No buscamos eliminarlo, buscamos escucharlo y bajar su intensidad.",
      ],
    },
    {
      kind: "metaphor",
      title: "Lectura simbolica",
      content:
        "El miedo es como una neblina en el camino: no te obliga a detenerte, pero te pide ir mas lento y con atencion. Con respiracion y apoyo, la neblina se hace mas clara.",
    },
    {
      kind: "language",
      title: "Lenguaje para acompanar",
      phrases: [
        "Tiene sentido que te asustes.",
        "Estoy aqui contigo.",
        "Vamos paso a paso.",
        "Tu cuerpo te esta cuidando.",
        "Respiremos juntos un momento.",
      ],
      questions: [
        "Que parte te asusta mas ahora?",
        "En tu cuerpo, donde se siente el miedo?",
        "Que te ayudaria para sentirte mas seguro?",
        "Quieres que lo hagamos juntos o lo ves desde aqui?",
      ],
    },
    {
      kind: "strategies",
      title: "En el momento (pico de miedo)",
      items: [
        "Baja el ritmo: habla lento y con voz suave.",
        "Ancla en el presente: nombra 3 cosas que vemos.",
        "Respiren 3 ciclos juntos.",
        "Ofrece contacto seguro: mano o abrazo firme si lo acepta.",
      ],
    },
    {
      kind: "strategies",
      title: "Despues (cuando ya bajo)",
      items: [
        "Nombra la emocion: Esto fue miedo.",
        "Busca el mensaje: El miedo queria avisar ___.",
        "Define un plan: La proxima vez podemos ___.",
      ],
    },
    {
      kind: "strategies",
      title: "Entrenamiento en calma (2-3 minutos)",
      items: [
        "Respiracion 3-4: inhala 3, exhala 4.",
        "Lugar seguro: imaginar un lugar tranquilo con detalles.",
        "Frase ancla: Estoy a salvo, ahora.",
      ],
    },
    {
      kind: "practice",
      title: "Respiracion neblina (60-90s)",
      description:
        "Inhalen contando 3, exhalen contando 4 como si la neblina se abriera. Repetir 4 veces. Al exhalar, soltar hombros.",
      materials: "Ninguno.",
    },
    {
      kind: "reflection",
      title: "Reflexion adulta",
      prompts: [
        "Me apresure a resolver o pude acompanarlo?",
        "Mostre calma con mi cuerpo y mi voz?",
        "Que senal de miedo paso desapercibida?",
      ],
    },
    {
      kind: "notes",
      title: "Notas",
      items: [
        "No minimizar: no es para tanto aumenta la inseguridad.",
        "Primero calma, luego explicaciones.",
        "El miedo baja mas rapido con presencia adulta.",
      ],
    },
  ],
};
