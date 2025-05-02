import { Story, JourneyStep } from "@/types/story";
import { rioEmocionesAmaruStory } from "./definitions/rio-emociones-amaru.story";
import { calmaTortugaStory } from "./definitions/calma-tortuga.story";
import { senderoPumaValienteStory } from "./definitions/sendero-puma.story";
export const stories: Story[] = [
  rioEmocionesAmaruStory,
  calmaTortugaStory,
  senderoPumaValienteStory,
];

export type { Story, JourneyStep };
