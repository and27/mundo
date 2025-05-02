import { Story } from "@/types/story";

export const rioEmocionesAmaruStory: Story = {
  id: "amaru",
  title: "El Río Sagrado de tus Emociones",
  guideId: "amaru",
  description:
    "Navega y observa las diferentes corrientes de tus sentimientos junto a Amaru.",
  coverImage: "/covers/amaru_cover.png",
  category: "emotions",
  initialStepId: "j3_intro_a",
  steps: [
    {
      id: "j3_intro_a",
      audioSrc: "/audio/journey3/j3_intro_a.mp3",
      subtitle:
        "Sssssaludos, pequeño ser de tierra y agua. Soy Amaru... la serpiente antigua... la que conoce las corrientes profundas.",
      visuals: { type: "scene" },
      interaction: { type: "auto_proceed", nextStepId: "j3_intro_b" },
      isNarration: true,
    },
    {
      id: "j3_intro_b",
      audioSrc: "/audio/journey3/j3_intro_b.mp3",
      subtitle:
        "No temas... vengo a acompañarte. Hoy te invito a un viaje especial... a sentir el río sagrado que fluye dentro de ti...",
      visuals: { type: "scene" },
      interaction: { type: "auto_proceed", nextStepId: "j3_intro_c" },
      isNarration: true,
    },
    {
      id: "j3_intro_c",
      audioSrc: "/audio/journey3/j3_intro_c.mp3",
      subtitle:
        "...el río de tus emociones. Si necesitas parar, solo abre tus ojos. ¿Listo, lista? Cierra los ojos suavemente... respira profundo... y escucha el fluir...",
      visuals: { type: "scene" },
      interaction: { type: "auto_proceed", nextStepId: "j3_sentir_a" },
      isNarration: true,
    },
    {
      id: "j3_sentir_a",
      audioSrc: "/audio/journey3/j3_sentir_a.mp3",
      subtitle:
        "Lleva tu atención adentro... a tu pecho... a tu barriga... Imagina un río allí. ¿Cómo fluye tu río interior... ahora mismo?",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey3/rio_inicial.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j3_sentir_b" },
      isNarration: true,
    },
    {
      id: "j3_sentir_b",
      audioSrc: "/audio/journey3/j3_sentir_b.mp3",
      subtitle:
        "¿Sus aguas van rápidas... o lentas? ¿Claras... u oscuras? ¿Tibias... o frescas? No juzgues... solo siente. Puedes mover tus manos suavemente... como siguiendo la corriente.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey3/rio_texturas.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j3_decision" },
      isNarration: true,
    },
    {
      id: "j3_decision",
      audioSrc: "/audio/journey3/j3_decision.mp3",
      subtitle:
        "Como los ríos de la tierra... tu río interior tiene muchas corrientes diferentes. Son tus emociones. Mira... una corriente dorada y cálida... y otra azul y fresca. ¿Cuál observamos primero?",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey3/dos_corrientes.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j3_corriente_desc" }, // Asume auto_proceed por ahora
      isNarration: true,
    },
    {
      id: "j3_corriente_desc",
      audioSrc: "/audio/journey3/j3_corriente_desc.mp3",
      subtitle:
        "Observemos la corriente dorada... siente su calor... mira su brillo... Quizás es alegría, entusiasmo... Y ahora, la corriente azul... nota su frescura... su movimiento... Tal vez es calma, o nervios...",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey3/corrientes_mezcladas.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j3_personalizar" },
      isNarration: true,
    },
    {
      id: "j3_personalizar",
      audioSrc: "/audio/journey3/j3_personalizar.mp3",
      subtitle:
        "Ahora... pon una mano suave en tu pecho o barriga... Siente tu propia corriente principal ahora. ¿Qué color le pones? ¿Qué nombre tiene para ti?",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey3/mano_pecho.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j3_mezcla_a" },
      isNarration: true,
    },
    {
      id: "j3_mezcla_a",
      audioSrc: "/audio/journey3/j3_mezcla_a.mp3",
      subtitle:
        "¿Ves? A veces las corrientes se encuentran... el dorado y el azul pueden fluir lado a lado... o mezclarse un poco, creando nuevos tonos y sensaciones.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey3/corrientes_mezcladas_detalle.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j3_mezcla_b" },
      isNarration: true,
    },
    {
      id: "j3_mezcla_b",
      audioSrc: "/audio/journey3/j3_mezcla_b.mp3",
      subtitle:
        "Está bien sentir varias cosas a la vez. Tu río interior es ancho... puede llevar muchas corrientes distintas. Todas son tuyas, todas fluyen.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey3/rio_ancho.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j3_navegar_a" },
      isNarration: true,
    },
    {
      id: "j3_navegar_a",
      audioSrc: "/audio/journey3/j3_navegar_a.mp3",
      subtitle:
        "A veces, el río se agita... las corrientes chocan... como pequeñas olas... Si se siente confuso o intenso... ¡Respira!",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey3/olas_suaves.png",
      },
      interaction: {
        type: "auto_proceed",
        nextStepId: "j3_navegar_b_respiracion",
      },
      isNarration: true,
    },
    {
      id: "j3_navegar_b_respiracion",
      audioSrc: "/audio/journey3/j3_navegar_b_respiracion.mp3",
      subtitle:
        "Inhala suave: 1... 2... 3... (pausa) Exhala lento: 1... 2... 3... 4...",
      visuals: { type: "breathing" }, // Activa animación
      interaction: { type: "auto_proceed", nextStepId: "j3_navegar_c" },
      isNarration: true,
    },
    {
      id: "j3_navegar_c",
      audioSrc: "/audio/journey3/j3_navegar_c.mp3",
      subtitle:
        "Imagina que flotas... que el agua te sostiene... no luches. Observa cómo la agitación... también es una corriente que pasa... y el río sigue.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey3/flotando_calma.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j3_aceptacion_a" },
      isNarration: true,
    },
    {
      id: "j3_aceptacion_a",
      audioSrc: "/audio/journey3/j3_aceptacion_a.mp3",
      subtitle:
        "Así es tu río interior... siempre en movimiento... siempre cambiando. Corrientes cálidas, frías, rápidas, lentas... todas son parte del río sagrado que eres tú.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey3/rio_fluido_final.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j3_aceptacion_b" },
      isNarration: true,
    },
    {
      id: "j3_aceptacion_b",
      audioSrc: "/audio/journey3/j3_aceptacion_b.mp3",
      subtitle:
        "No hay emociones 'buenas' o 'malas'... solo agua que fluye... emociones que vienen y van. Acéptalas... obsérvalas con curiosidad.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey3/rio_fluido_final.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j3_outro_a" },
      isNarration: true,
    },
    {
      id: "j3_outro_a",
      audioSrc: "/audio/journey3/j3_outro_a.mp3",
      subtitle:
        "Poco a poco... trae tu atención de vuelta. Siente de nuevo tus pies... muévelos suavemente... Siente tus manos... abre y cierra los dedos despacio...",
      visuals: { type: "scene" },
      interaction: { type: "auto_proceed", nextStepId: "j3_outro_b" },
      isNarration: true,
    },
    {
      id: "j3_outro_b",
      audioSrc: "/audio/journey3/j3_outro_b.mp3",
      subtitle:
        "Mueve tus hombros en círculo... una vez... dos veces... Respira profundo una última vez... y suelta el aire con un suspiro suave... Recuerda... eres como este río sagrado... fluyendo, cambiando, sintiendo.",
      visuals: { type: "scene" },
      interaction: { type: "auto_proceed", nextStepId: "j3_outro_c" },
      isNarration: true,
    },
    {
      id: "j3_outro_c",
      audioSrc: "/audio/journey3/j3_outro_c.mp3",
      subtitle:
        "Puedes navegar tus aguas interiores con calma y curiosidad. Amaru... el río... siempre fluye contigo. Sssss... Cuando estés listo, lista... abre lentamente tus ojos.",
      visuals: { type: "scene" },
      interaction: { type: "auto_proceed", nextStepId: "end" },
      isNarration: true,
    },
  ],
};
