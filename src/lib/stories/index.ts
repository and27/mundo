import { Story, JourneyStep } from "@/types/story";
import { rioEmocionesAmaruStory } from "./definitions/rio-emociones-amaru.story";
import { calmaTortugaStory } from "./definitions/calma-tortuga.story";
import { senderoPumaValienteStory } from "./definitions/sendero-puma.story";
import { losOjosDelCondorStory } from "./definitions/kuntur.story";
import { yachayFear } from "./definitions/yachay-fear.story";

export const stories: Story[] = [
  rioEmocionesAmaruStory,
  calmaTortugaStory,
  senderoPumaValienteStory,
  losOjosDelCondorStory,
  yachayFear,
];

export type { Story, JourneyStep };
