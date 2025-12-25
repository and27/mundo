import { Program } from "@/types/program";

export const program: Program = {
  id: "program_base_v1",
  title: "Alfabetización emocional",
  description:
    "Un recorrido gradual para que niñas y niños aprendan a reconocer, habitar y regular sus emociones, acompañado por adultos conscientes.",

  lessons: [
    {
      id: "1",
      title: "Enfado y Rabia",
      coverImage: "/images/modules/anger.png",
      storyId: "anger_story",
      guideId: "anger_guide",
      order: 1,
      emotion: "ira",
    },

    {
      id: "2",
      title: "Miedo",
      coverImage: "/images/modules/fear.png",
      storyId: "fear_story",
      guideId: "fear_guide",
      order: 2,
      emotion: "miedo",
    },

    {
      id: "sadness",
      title: "Tristeza",
      coverImage: "/images/modules/sadness.png",
      storyId: "sadness_story",
      guideId: "sadness_guide",
      order: 3,
      emotion: "tristeza",
    },

    {
      id: "joy",
      title: "Alegría y Optimismo",
      coverImage: "/images/modules/joy.png",
      storyId: "joy_story",
      guideId: "joy_guide",
      order: 4,
      emotion: "miedo",
    },

    {
      id: "jealousy",
      title: "Celos y Comparaciones",
      coverImage: "/images/modules/jealousy.png",
      storyId: "jealousy_story",
      guideId: "jealousy_guide",
      order: 5,
      emotion: "ira",
    },

    {
      id: "shame",
      title: "Vergüenza",
      coverImage: "/images/modules/shame.png",
      storyId: "shame_story",
      guideId: "shame_guide",
      order: 6,
      emotion: "vergüenza",
    },
  ],
};
