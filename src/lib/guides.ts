// /lib/guides/index.ts
import { ActionableGuide } from "@/types/ai";
// Si tu Emotion es un union/string, importa el type y úsalo.
// Si Emotion es objeto, omite esto o asigna el objeto real.

export const guides: Record<string, ActionableGuide> = {
  anger_guide: {
    id: "anger_guide",
    guideTitle: "Taller emocional: Enfado y Rabia",

    /**
     * Recomendado (estable para DB).
     * Si tu ActionableGuide aún usa `emotion: Emotion`, igual puedes setearlo abajo.
     */
    emotionId: "ira",

    tags: ["rabia", "frustración", "límites", "regulación", "validación"],

    /** 1) Comprender */
    understanding: {
      title: "¿Qué es la rabia?",
      content:
        "La rabia es una emoción de protección. Suele aparecer cuando algo se siente injusto, cuando hay frustración o cuando una necesidad importante no está siendo atendida. La rabia no es mala: lo que necesita es un cauce seguro.",
    },

    /** 2) Normalizar */
    normalization: [
      "Es normal sentir rabia cuando algo no sale como esperábamos.",
      "La rabia puede sentirse como calor, tensión, puños apretados o ganas de gritar.",
      "El objetivo no es eliminar la rabia, sino ayudar a que baje sin hacer daño.",
    ],

    /** 3) Lectura simbólica (tu metáfora central) */
    metaphorStory:
      "La rabia aparece como un volcán interior: no es peligrosa en sí misma, pero necesita ser escuchada y contenida para no desbordarse. En vez de apagarla a la fuerza, aprendemos a enfriar el calor y dirigir su energía hacia acciones seguras.",

    /** 4) Lenguaje (validación + exploración) */
    conversationPlan: {
      phrasesToValidate: [
        "Tiene sentido que te hayas sentido así.",
        "Veo que fue muy intenso para ti.",
        "Estoy aquí contigo.",
        "Tu rabia no es mala. Vamos a escuchar lo que quiere decir.",
        "No te dejo lastimar, y sí te ayudo a calmarte.",
      ],
      questionsToExplore: [
        "¿Dónde sientes la rabia en tu cuerpo (manos, pecho, cara)?",
        "¿Qué fue lo más difícil de este momento?",
        "¿Qué necesitabas que pasara?",
        "Si la rabia pudiera hablar, ¿qué diría?",
        "¿Qué te ayudaría ahora: agua, respiración o un abrazo firme?",
      ],
    },

    /** 5) Estrategias prácticas (estilo Elsa: secciones claras) */
    strategies: [
      {
        title: "En el momento (pico de rabia)",
        items: [
          "Habla poco y lento: frases cortas, no explicaciones largas.",
          "Valida + límite: “Tiene sentido… y no te dejo golpear”.",
          "Co-regula: respira tú primero 2 ciclos antes de pedirle algo.",
          "Descarga segura: empujar la pared 10 segundos, apretar una almohada, pisar fuerte 5 veces.",
          "Ofrece dos opciones: “¿Agua o respiramos juntos?”",
        ],
      },
      {
        title: "Después (cuando ya bajó)",
        items: [
          "Nombra la emoción: “Esto fue rabia”.",
          "Encuentra el mensaje: “La rabia quería decir ____”.",
          "Define plan: “La próxima vez probamos ____”.",
          "Repara: “¿Cómo lo arreglamos?” (si hubo daño).",
        ],
      },
      {
        title: "Entrenamiento en calma (2–3 minutos al día)",
        items: [
          "Semáforo emocional: Rojo = pausa/respira, Amarillo = nombra, Verde = solución.",
          "Caja de calma: plastilina, pelota antiestrés, hojas para romper, dibujo rápido.",
          "Señal secreta: una palabra (“pausa”) para activar regulación sin discusión.",
        ],
      },
    ],

    /** 6) Práctica somática (simple, repetible) */
    suggestedActivity: {
      title: "Respiración Volcán (60–90s)",
      description:
        "Inhalen por la nariz contando 3 como si tomaran aire fresco. Exhalen por la boca contando 4 como si soltaran vapor y el volcán interior se enfriara. En cada exhalación, suelten hombros y manos. Repitan 4 veces.",
      materials: "Ninguno (opcional: un vaso de agua para ‘enfriar’).",
    },

    /** 7) Reflexión adulta */
    reflectionPrompts: [
      "¿En qué momento me tensé yo? ¿Qué necesitaba para mantener presencia?",
      "¿Puse límites claros sin castigo ni humillación?",
      "¿Qué frase funcionó mejor para validar sin ceder el límite?",
      "¿Qué haremos distinto la próxima vez (una sola cosa concreta)?",
    ],

    /**
     * 8) Observaciones rápidas (NO meter todo aquí).
     * Déjalo como tips de bolsillo, máximo 3–6.
     */
    resources: [
      "Evita “cálmate ya” o “no es para tanto”: aumenta vergüenza y rabia.",
      "Nombra lo observable: “Veo tus manos apretadas”.",
      "Primero regula, luego conversan.",
      "Rabia ≠ agresión: emoción válida, conducta guiada.",
    ],
  },
};
