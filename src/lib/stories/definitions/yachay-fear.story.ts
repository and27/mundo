import { Story } from "@/types/story";

export const yachayFear: Story = {
  id: "journey4_yachay_puma",
  title: "Yachay, el Joven Puma y la Montaña",
  guideId: "yachay",
  description:
    "Una historia de las montañas sagradas para transformar el miedo",
  coverImage: "/images/journeyFear/yachay_puma_cover.png",
  category: "emotions",
  initialStepId: "j4_intro_contexto",
  steps: [
    {
      id: "j4_intro_contexto",
      audioSrc: "/audio/journey4/J4_Intro_Contexto.mp3",
      subtitle:
        "En las faldas del gran Apu vivía una familia de pumas guardianes. El más joven se llamaba Yachay. Desde cachorro, su tarea era vigilar los senderos sagrados, mientras los mayores cuidaban las cumbres. Pero Yachay todavía estaba aprendiendo a ser valiente.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journeyFear/montanas_sagradas_bg.png",
        foregroundImage: "/images/journeyFear/familia_pumas.png",
      },
      interaction: {
        type: "auto_proceed",
        nextStepId: "j4_problema_comunitario",
      },
      isNarration: true,
    },
    {
      id: "j4_problema_comunitario",
      audioSrc: "/audio/journey4/J4_Problema_Comunitario.mp3",
      subtitle:
        "Una noche, la abuela puma se enfermó. Necesitaba agua de la vertiente sagrada que nace en una cueva antigua. Los pumas mayores estaban lejos, protegiendo la montaña. Solo quedaba Yachay.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journeyFear/abuela_enferma.png",
        foregroundImage: "/images/journeyFear/abuela_enferma.png",
      },
      interaction: {
        type: "auto_proceed",
        nextStepId: "j4_miedo_natural",
      },
      isNarration: true,
    },
    {
      id: "j4_miedo_natural",
      audioSrc: "/audio/journey4/J4_Miedo_Natural.mp3",
      subtitle:
        "Yachay conocía el camino de día, pero de noche... era diferente. La entrada de la cueva parecía una boca oscura. Sus patitas temblaban. 'Tayta Apu', susurró — así llaman los pumas a la gran montaña que los cuida, como un padre sabio y fuerte — 'tengo miedo, pero mi abuela me necesita.'",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journeyFear/cueva_oscura_bg.png",
        foregroundImage: "/images/journeyFear/yachay_temeroso.png",
      },
      interaction: {
        type: "auto_proceed",
        nextStepId: "j4_aparicion_kuntur",
      },
      isNarration: true,
    },
    {
      id: "j4_aparicion_kuntur",
      audioSrc: "/audio/journey4/J4_Aparicion_Kuntur.mp3",
      subtitle:
        "Una sombra pasó sobre la luna. Era Kuntur, el cóndor mensajero del Apu. Su vuelo no traía palabras, sino señales antiguas. Voló en silencio y se posó frente a la cueva. Sus ojos antiguos miraron a Yachay con calma. No apuraba, no exigía. Solo estaba allí, presente.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journeyFear/noche_luna_bg.png",
        foregroundImage: "/images/journeyFear/kuntur_posado.png",
      },
      interaction: {
        type: "auto_proceed",
        nextStepId: "j4_primera_ensenanza_samay",
      },
      isNarration: true,
    },
    {
      id: "j4_primera_ensenanza_samay",
      audioSrc: "/audio/journey4/J4_Primera_Ensenanza_Samay.mp3",
      subtitle:
        "Kuntur abrió sus alas... despacio... y las cerró. Las volvió a abrir... y a cerrar. Yachay comprendió. Kuntur le estaba enseñando como calmarse con el aliento sagrado de la montaña. Respira con Yachay, como el cóndor en el cielo... Abre tus brazos como alas... uno... dos... tres. Guarda las alas en tu pecho... uno... dos... tres. Sopla tu miedo al viento... uno... dos... tres. El Apu recibe tu miedo… y te devuelve calma.",
      visuals: {
        type: "breathing",
        breathingCueType: "expand_contract",
        backgroundImage: "/images/journeyFear/cielo_montanas_bg.png",
        foregroundImage: "/images/journeyFear/kuntur_ensenanza.png",
      },
      interaction: {
        type: "auto_proceed",
        nextStepId: "j4_conexion_pachamama",
      },
      isNarration: true,
    },
    {
      id: "j4_conexion_pachamama",
      audioSrc: "/audio/journey4/J4_Conexion_Pachamama.mp3",
      subtitle:
        "Kuntur tocó la tierra con su ala. Yachay entendió la segunda enseñanza... Pon tus manos sobre el suelo, o sobre tu cama, o sobre tu pecho si estás acostado. Presiona suave... siente el calor... la fuerza... la Pachamama — la madre tierra — está ahí. La tierra sostenía a Yachay bajo sus patitas. Y también te sostiene a ti. No estás solo.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journeyFear/pachamama_conexion_bg.png",
      },
      interaction: {
        type: "auto_proceed",
        nextStepId: "j4_decision_ayni",
      },
      isNarration: true,
    },
    {
      id: "j4_decision_ayni",
      audioSrc: "/audio/journey4/J4_Decision_Ayni.mp3",
      subtitle:
        "Pero entrar a un lugar sagrado requiere dar algo a cambio (ayni). Cierra los ojos un momento... Piensa: ¿qué puedes ofrecer tú hoy? Una palabra buena. Un dibujo. Una promesa pequeña. Algo desde tu corazón. Siente esa ofrenda… y sopla suave hacia los cuatro vientos. Yachay encontró tres hojitas secas en su bolsita. Las sopló hacia los vientos: 'Para ti, Apu. Para ti, Pachamama. Para los que cuidan esta agua.'",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journeyFear/decision_ayni_bg.png",
      },
      interaction: {
        type: "auto_proceed",
        nextStepId: "j4_entrada_protegida",
      },
      isNarration: true,
    },

    {
      id: "j4_entrada_protegida",
      audioSrc: "/audio/journey4/J4_Entrada_Protegida.mp3",
      subtitle:
        "Con el aliento de la montaña en su pecho, y sus patas firmes en la Pachamama, Yachay entró. La oscuridad ya no era un monstruo. Era como el vientre de la madre tierra: oscuro, sí, pero protector.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journeyFear/cueva_sagrada_bg.png",
      },
      interaction: {
        type: "auto_proceed",
        nextStepId: "j4_agua_sagrada",
      },
      isNarration: true,
    },

    {
      id: "j4_agua_sagrada",
      audioSrc: "/audio/journey4/J4_Tercera_Ensenanza.mp3",
      subtitle:
        "En el fondo de la cueva, el agua sagrada cantaba. Kuntur lo esperaba en silencio, como si siempre hubiese sabido que Yachay llegaría. Yachay llenó la pequeña calabaza con cuidado. 'Gracias, Yakumama — madre agua. Gracias, Apu protector.'",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journeyFear/agua_sagrada_bg.png",
      },
      interaction: {
        type: "auto_proceed",
        nextStepId: "j4_regreso_transformado",
      },
      isNarration: true,
    },

    {
      id: "j4_regreso_transformado",
      audioSrc: "/audio/journey4/J4_Regreso_Transformado.mp3",
      subtitle:
        "Cuando Yachay salió, ya no era el mismo. Seguía siendo joven, y la oscuridad seguía ahí. Pero ahora sabía qué hacer con su miedo. Kuntur voló alto en silencio, como diciendo: 'Ya sabes el camino.'",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journeyFear/salida_cueva_bg.png",
      },
      interaction: {
        type: "auto_proceed",
        nextStepId: "j4_sanacion_abuela",
      },
      isNarration: true,
    },

    {
      id: "j4_sanacion_abuela",
      audioSrc: "/audio/journey4/J4_Sanacion_Abuela.mp3",
      subtitle:
        "La abuela puma bebió el agua sagrada y sus ojos se iluminaron. 'Yachay', dijo, 'has aprendido las tres enseñanzas: la respiración que calma, la Pachamama que te sostiene, y el ayni que abre caminos. Eres un verdadero guardián.'",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journeyFear/hogar_pumas_bg.png",
      },
      interaction: {
        type: "auto_proceed",
        nextStepId: "end",
      },
      isNarration: true,
    },
  ],
};
