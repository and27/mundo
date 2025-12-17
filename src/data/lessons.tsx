type LessonJourney = {
  title: string;
  description: string;
  guideId: string;
  steps: {
    id: string;
    subtitle: string;
    visuals?: {
      type?: "breathing";
      backgroundImage?: string;
    };
  }[];
};

type Lesson = {
  id: string;
  title: string;
  image: string;
  story: string[];
  journey?: LessonJourney;
  technique?: {
    title: string;
    steps: string[];
  };
  activity?: {
    question: string;
    options: string[];
  };
  resources: string[];
};

export const lessons: Record<string, Lesson> = {
  "1": {
    id: "1",
    title: "Enfado y Rabia",
    image: "/images/all.webp",

    story: [
      "Había una vez un niño que sentía un volcán dentro del pecho cada vez que algo no salía como esperaba.",
      "El calor subía, su cara se ponía roja, y sus manos se apretaban como puños de fuego.",
      "Un día descubrió que el volcán no era peligroso… solo necesitaba aprender a escucharlo y dejarlo enfriarse.",
    ],

    journey: {
      title: "El volcán interior",
      description: "Aprendemos a escuchar la rabia sin miedo",
      guideId: "yachay",
      steps: [
        {
          id: "anger-1",
          subtitle:
            "A veces sentimos un volcán dentro del pecho cuando algo no sale como esperamos.",
          visuals: {
            backgroundImage: "/images/backgrounds/volcano.webp",
          },
        },
        {
          id: "anger-2",
          subtitle:
            "El cuerpo se calienta, los músculos se tensan. La rabia quiere decir algo.",
        },
        {
          id: "anger-3",
          subtitle: "Respira conmigo. El volcán puede enfriarse poco a poco.",
          visuals: {
            type: "breathing",
          },
        },
      ],
    },

    technique: {
      title: "Respiración Volcán",
      steps: [
        "Inhala profundo por la nariz, recogiendo aire fresco.",
        "Exhala por la boca, liberando el calor.",
        "Repite 3 veces mientras relajas tus manos y hombros.",
      ],
    },

    activity: {
      question: "¿Qué siente tu cuerpo cuando te molestas?",
      options: ["Manos tensas", "Calor en la cara", "Latidos rápidos"],
    },

    resources: [
      "Valida la emoción sin decir frases como: “No te enojes por eso”.",
      "Ayuda a tu hijo a ponerle nombre a lo que siente.",
      "Muéstrale estrategias de calma antes de que la rabia escale.",
    ],
  },

  "2": {
    id: "2",
    title: "Miedo",
    image: "/images/modules/fear.png",
    story: [],
    resources: [],
  },

  "3": {
    id: "3",
    title: "Tristeza",
    image: "/images/modules/sadness.png",
    story: [],
    resources: [],
  },

  "4": {
    id: "4",
    title: "Alegría y Optimismo",
    image: "/images/modules/joy.png",
    story: [],
    resources: [],
  },

  "5": {
    id: "5",
    title: "Celos y Comparaciones",
    image: "/images/modules/jealousy.png",
    story: [],
    resources: [],
  },

  "6": {
    id: "6",
    title: "Vergüenza",
    image: "/images/modules/shame.png",
    story: [],
    resources: [],
  },
};
