import { Story } from "@/types/story";

export const calmaTortugaStory: Story = {
  id: "hatun",
  title: "La Calma de la Tortuga",
  guideId: "hatun",
  description:
    "Aprende a encontrar tu ritmo lento y tranquilo con la Abuela Tortuga.",
  coverImage: "/covers/tortuga_cover.png",
  category: "breathing",
  initialStepId: "j1_intro",
  steps: [
    {
      id: "j1_intro",
      audioSrc: "/audio/journey1/j1_intro.mp3",
      subtitle:
        "¿Oyes cómo canta el agua? Chuuu... baja rápido por la montaña... A veces, lleva hojitas secas, se mueve mucho entre las piedras... Y aquí adentro... nuestros pensamientos también pueden correr así, un poquito apurados, ¿cierto? Pero hasta el río más juguetón encuentra su calma. Yo conozco un secreto... ¿Quieres que busquemos juntos ese lugar tranquilo?",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey1/stream_bg.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "j1_breathing" },
      isNarration: true,
    },
    {
      id: "j1_breathing",
      audioSrc: "/audio/journey1/j1_breathing.mp3",
      subtitle:
        "Muy bien... Ahora, respira conmigo... muy lento... como una tortuga. Toma aire suavecito por tu nariz... siente cómo llena tu pancita... Y ahora, bota el aire despacito por tu boca... shhhh... Otra vez... Toma aire despacio... Suelta el aire suavemente... Una última vez, bien profundo... Aire adentro... Aire afuera... ¡Eso es! Muy bien...",
      visuals: {
        type: "breathing",
        // backgroundImage opcional aquí si quieres un fondo específico para respirar
        backgroundImage: "/images/journey1/stream_bg_soft.png", // Lo tenías en el feedback, lo pongo aquí
      },
      interaction: { type: "auto_proceed", nextStepId: "j1_prompt" },
      isNarration: true,
    },
    {
      id: "j1_prompt",
      audioSrc: "/audio/journey1/j1_prompt.mp3",
      subtitle:
        "Y ahora... después de respirar como la Abuela Tortuga... ¿cómo te sientes por dentro? Toca la palabra que se parece más a tu sentir ahora.",
      visuals: {
        type: "choice",
        choices: [
          {
            id: "choice_tranquilo",
            icon: "/images/icons/leaf.png",
            label: "Tranquilo/a",
          },
          {
            id: "choice_calmado",
            icon: "/images/icons/rock.png",
            label: "Calmado/a",
          },
          {
            id: "choice_lento",
            icon: "/images/icons/snail.png",
            label: "Lento/a",
          },
        ],
        // backgroundImage opcional aquí también si quieres
        backgroundImage: "/images/journey1/stream_bg.png",
      },
      interaction: {
        type: "wait_for_tap",
        tappableTarget: "choice",
        nextStepId: "j1_feedback",
      },
      isNarration: true,
    },
    {
      id: "j1_feedback",
      audioSrc: "/audio/journey1/j1_feedback.mp3",
      subtitle:
        "Ajá... Qué bien se siente encontrar esa pausa, ¿verdad? Recuerda siempre este secreto: como la tortuga busca su roca... tú siempre puedes usar tu respiración lenta y tranquila para encontrar tu propia calma...",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey1/stream_bg_soft.png", // El fondo que tenías aquí
        // foregroundImage: "/images/journey1/ilustracion_rio_calmo.png", // Puedes añadir ilustración ADEMÁS del fondo si quieres
      },
      interaction: { type: "auto_proceed", nextStepId: "j1_outro" },
      isNarration: true,
    },
    {
      id: "j1_outro",
      audioSrc: "/audio/journey1/j1_outro.mp3",
      subtitle:
        "¡Buen trabajo, pequeño caminante, pequeña caminante! La calma de la tortuga vive en ti. Vuelve cuando quieras.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey1/ilustracion_paisaje_final.png", // El fondo que tenías aquí
        // foregroundImage: "/images/journey1/ilustracion_paisaje_final.png", // Si quieres que la imagen sea también primer plano
      },
      interaction: { type: "auto_proceed", nextStepId: "end" },
      isNarration: true,
    },
  ],
};
