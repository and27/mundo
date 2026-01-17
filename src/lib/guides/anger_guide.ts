import { ActionableGuide } from "@/types/ai";

export const anger_guide: ActionableGuide = {
  id: "anger_guide",
  guideTitle: "Taller emocional: Enfado y Rabia",
  emotionId: "ira",
  tags: ["rabia", "frustracion", "limites", "regulacion", "validacion"],
  sections: [
    {
      kind: "understanding",
      title: "Que es la rabia?",
      content:
        "La rabia es una emocion de proteccion. Suele aparecer cuando algo se siente injusto, cuando hay frustracion o cuando una necesidad importante no esta siendo atendida. La rabia no es mala: lo que necesita es un cauce seguro.",
    },
    {
      kind: "normalization",
      title: "Normalizar",
      bullets: [
        "Es normal sentir rabia cuando algo no sale como esperabamos.",
        "La rabia puede sentirse como calor, tension, punos apretados o ganas de gritar.",
        "El objetivo no es eliminar la rabia, sino ayudar a que baje sin hacer dano.",
      ],
    },
    {
      kind: "metaphor",
      title: "Lectura simbolica",
      content:
        "La rabia aparece como un volcan interior: no es peligrosa en si misma, pero necesita ser escuchada y contenida para no desbordarse. En vez de apagarla a la fuerza, aprendemos a enfriar el calor y dirigir su energia hacia acciones seguras.",
    },
    {
      kind: "language",
      title: "Lenguaje para acompanar",
      phrases: [
        "Tiene sentido que te hayas sentido asi.",
        "Veo que fue muy intenso para ti.",
        "Estoy aqui contigo.",
        "Tu rabia no es mala. Vamos a escuchar lo que quiere decir.",
        "No te dejo lastimar, y si te ayudo a calmarte.",
      ],
      questions: [
        "Donde sientes la rabia en tu cuerpo (manos, pecho, cara)?",
        "Que fue lo mas dificil de este momento?",
        "Que necesitabas que pasara?",
        "Si la rabia pudiera hablar, que diria?",
        "Que te ayudaria ahora: agua, respiracion o un abrazo firme?",
      ],
    },
    {
      kind: "strategies",
      title: "En el momento (pico de rabia)",
      items: [
        "Habla poco y lento: frases cortas, no explicaciones largas.",
        "Valida y limite: Tiene sentido y no te dejo golpear.",
        "Co-regula: respira tu primero 2 ciclos antes de pedirle algo.",
        "Descarga segura: empujar la pared 10 segundos, apretar una almohada, pisar fuerte 5 veces.",
        "Ofrece dos opciones: Agua o respiramos juntos?",
      ],
    },
    {
      kind: "strategies",
      title: "Despues (cuando ya bajo)",
      items: [
        "Nombra la emocion: Esto fue rabia.",
        "Encuentra el mensaje: La rabia queria decir ____.",
        "Define plan: La proxima vez probamos ____.",
        "Repara: Como lo arreglamos? (si hubo dano).",
      ],
    },
    {
      kind: "strategies",
      title: "Entrenamiento en calma (2-3 minutos al dia)",
      items: [
        "Semaforo emocional: Rojo = pausa/respira, Amarillo = nombra, Verde = solucion.",
        "Caja de calma: plastilina, pelota antiestres, hojas para romper, dibujo rapido.",
        "Senal secreta: una palabra (pausa) para activar regulacion sin discusion.",
      ],
    },
    {
      kind: "practice",
      title: "Respiracion volcan (60-90s)",
      description:
        "Inhalen por la nariz contando 3 como si tomaran aire fresco. Exhalen por la boca contando 4 como si soltaran vapor y el volcan interior se enfriara. En cada exhalacion, suelten hombros y manos. Repitan 4 veces.",
      materials: "Ninguno (opcional: un vaso de agua para 'enfriar').",
    },
    {
      kind: "reflection",
      title: "Reflexion adulta",
      prompts: [
        "En que momento me tense yo? Que necesitaba para mantener presencia?",
        "Puse limites claros sin castigo ni humillacion?",
        "Que frase funciono mejor para validar sin ceder el limite?",
        "Que haremos distinto la proxima vez (una sola cosa concreta)?",
      ],
    },
    {
      kind: "notes",
      title: "Notas",
      items: [
        "Evita calmate ya o no es para tanto: aumenta verguenza y rabia.",
        "Nombra lo observable: Veo tus manos apretadas.",
        "Primero regula, luego conversan.",
        "Rabia no es agresion: emocion valida, conducta guiada.",
      ],
    },
  ],
};
