import { Story } from "@/types/story";

export const senderoPumaValienteStory: Story = {
  id: "yachay",
  title: "El Sendero del Puma Valiente",
  guideId: "yachay",
  description:
    "Encuentra tu fuerza interior para caminar con calma ante el miedo junto a Yachay.",
  coverImage: "/covers/yachay_cover.png",
  category: "emotions",
  initialStepId: "j2_intro_a",
  steps: [
    {
      id: "j2_intro_a",
      audioSrc: "/audio/journey2/J2_Intro_A.mp3",
      subtitle:
        "Hola, joven caminante. Soy Yachay, tu guía en este sendero interior. Camina conmigo ahora... imagina este camino alto en el páramo andino. Si en cualquier momento necesitas parar, solo abre tus ojos o mueve suavemente tus dedos. Estamos juntos en esto.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey2/sendero_inicio.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j2_intro_b" },
      isNarration: true,
    },
    {
      id: "j2_intro_b",
      audioSrc: "/audio/journey2/J2_Intro_B.mp3",
      subtitle:
        "Siente el aire fresco en tu rostro... escucha el silencio grande de la montaña. El sol Inti calienta las piedras bajo tus pies imaginarios. Avanza tranquilo, tranquila... sintiendo cada paso firme sobre la tierra...",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey2/sendero_inicio.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j2_disparo_miedo" },
      isNarration: true,
    },
    {
      id: "j2_disparo_miedo",
      audioSrc: "/audio/journey2/j2_disparo_miedo.mp3",
      subtitle:
        "¡Espera!... Detente un momento. ¿Escuchaste eso?... Un sonido rápido... entre las rocas cercanas. O mira al frente... ¿ves cómo la neblina baja rápido? Empieza a cubrir el sendero... Lo que veías claro, ahora se siente misterioso... quizás un poco incierto, ¿verdad?",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey2/sendero_neblina.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j2_notar_a" },
      isNarration: true,
    },
    {
      id: "j2_notar_a",
      audioSrc: "/audio/journey2/j2_notar_sensaciones_a.mp3",
      subtitle:
        "Ahora... con curiosidad, nota qué pasa dentro de ti. Puedes cerrar los ojos si te ayuda. Quizás notes tu corazón... ¿late un poquito más rápido?... tum, tum... Puedes poner una mano sobre él si quieres sentirlo.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey2/foco_interior_puma.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j2_notar_b" },
      isNarration: true,
    },
    {
      id: "j2_notar_b",
      audioSrc: "/audio/journey2/j2_notar_sensaciones_b.mp3",
      subtitle:
        "¿Y tu respiración? ¿Sientes cómo sube y baja tu pecho o tu barriga? ¿Se hizo más corta?... ¿Hay quizás alguna tensión pequeña en tus hombros... o en tu estómago? Solo nota, sin juzgar.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey2/foco_interior_puma.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j2_notar_c" },
      isNarration: true,
    },
    {
      id: "j2_notar_c",
      audioSrc: "/audio/journey2/j2_notar_sensaciones_c.mp3",
      subtitle:
        "Está bien sentir todo eso. Es tu cuerpo atento, cuidándote. A veces le llamamos miedo... es un mensajero antiguo, importante. Obsérvalo con calma... como el puma observa el viento en el páramo.",
      visuals: { type: "scene" },
      interaction: { type: "auto_proceed", nextStepId: "j2_anclaje_a" },
      isNarration: true,
    },
    {
      id: "j2_anclaje_a",
      audioSrc: "/audio/journey2/j2_guia_anclaje_a.mp3",
      subtitle:
        "Ahora, vamos a encontrar nuestra fuerza interior, la que siempre está ahí, como la montaña. Respira profundo conmigo una vez... Inhala contando uno... dos... tres... Exhala lento... uno... dos... tres... cuatro...",
      visuals: { type: "breathing" },
      interaction: { type: "auto_proceed", nextStepId: "j2_anclaje_b" },
      isNarration: true,
    },
    {
      id: "j2_anclaje_b",
      audioSrc: "/audio/journey2/j2_guia_anclaje_b.mp3",
      subtitle:
        "Siente el peso de tus pies en la tierra imaginaria. Presiona suavemente las plantas contra el suelo... Imagina que son firmes, fuertes... como las patas del puma sobre la roca sólida. Siente cómo la Pachamama, la tierra, te sostiene... siempre estable... siempre segura...",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey2/huella_puma.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j2_anclaje_c" },
      isNarration: true,
    },
    {
      id: "j2_anclaje_c",
      audioSrc: "/audio/journey2/j2_guia_anclaje_c.mp3",
      subtitle:
        "Y siente también la montaña... inmensa... quieta... poderosa dentro de ti. Esa misma fuerza... esa calma fuerte de la montaña... también vive en tu interior. Respira... y siéntela en tu centro.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey2/montana_simbolo.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j2_prompt" },
      isNarration: true,
    },
    {
      id: "j2_prompt",
      audioSrc: "/audio/journey2/j2_prompt_decision.mp3",
      subtitle:
        "Muy bien. Con esta fuerza tranquila que encontraste... con tus pies firmes como el puma... la neblina quizás sigue ahí... pero tú estás aquí, presente y fuerte. ¿Cómo eliges dar el siguiente paso ahora, usando tu calma?",
      visuals: {
        type: "choice",
        backgroundImage: "/images/journey2/neblina_opciones.png",
        choices: [
          {
            id: "choice_paso_firme",
            icon: "/images/icons/huella.png",
            label: "Paso Firme",
          },
          {
            id: "choice_observar",
            icon: "/images/icons/ojo.png",
            label: "Observar",
          },
        ],
      },
      interaction: {
        type: "wait_for_tap",
        tappableTarget: "choice",
        defaultNextStepId: "j2_outro_a",
      },
      isNarration: true,
    },
    {
      id: "j2_feedback_firme",
      audioSrc: "/audio/journey2/j2_feedback_paso_firme.mp3",
      subtitle:
        "Bien. Un paso lento... firme... sintiendo la tierra. Usas tu fuerza interior y tu calma para avanzar con cuidado, aunque no veas todo claro. Es una elección valiente y sabia.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey2/huella_final.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j2_outro_a" },
      isNarration: true,
    },
    {
      id: "j2_feedback_observar",
      audioSrc: "/audio/journey2/j2_feedback_observar.mp3",
      subtitle:
        "Bien. Te detienes... respiras... y observas la neblina con calma, sin apuro. Usas tu fuerza interior para mirar el desafío con claridad antes de actuar. Es una elección paciente y sabia.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey2/ojo_observador.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j2_outro_a" },
      isNarration: true,
    },
    {
      id: "j2_outro_a",
      audioSrc: "/audio/journey2/J2_Outro_A.mp3",
      subtitle:
        "El miedo puede ser como la neblina... a veces aparece en nuestro camino.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey2/sendero_despejado.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j2_outro_b" },
      isNarration: true,
    },
    {
      id: "j2_outro_b",
      audioSrc: "/audio/journey2/J2_Outro_B.mp3",
      subtitle:
        "Pero recuerda siempre, caminante: dentro de ti vive la fuerza tranquila de la montaña...",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey2/montana_simbolo_final.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j2_outro_c" },
      isNarration: true,
    },
    {
      id: "j2_outro_c",
      audioSrc: "/audio/journey2/J2_Outro_C.mp3",
      subtitle:
        "...y la pisada firme del puma. Respira, siente tu conexión con la tierra, encuentra tu calma fuerte... y así podrás seguir caminando tu sendero.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey2/huella_final.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j2_outro_d" },
      isNarration: true,
    },
    {
      id: "j2_outro_d",
      audioSrc: "/audio/journey2/J2_Outro_D.mp3",
      subtitle:
        "No sin miedo, quizás... pero sí con valentía. Tu fuerza interior siempre te acompaña. Ahora, poco a poco, regresa tu atención aquí.",
      visuals: { type: "scene" },
      interaction: { type: "auto_proceed", nextStepId: "j2_outro_e" },
      isNarration: true,
    },
    {
      id: "j2_outro_e",
      audioSrc: "/audio/journey2/J2_Outro_E.mp3",
      subtitle:
        "Mueve suavemente los dedos de tus pies... y los dedos de tus manos... Estírate suavemente si tu cuerpo te lo pide... Respira profundo una vez más... Y cuando estés listo, lista, abre lentamente tus ojos.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey2/luz_calma_final.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "end" },
      isNarration: true,
    },
  ],
};
