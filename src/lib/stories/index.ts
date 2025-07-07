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

export async function loadStory(id: string): Promise<Story | undefined> {
  const staticStory = stories.find((s) => s.id === id);
  if (staticStory) return staticStory;

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? `http://localhost:${process.env.PORT || 3000}`
      : process.env.NEXT_PUBLIC_SITE_URL;

  try {
    const res = await fetch(`${baseUrl}/stories/${id}.json`);

    if (!res.ok) return undefined;
    const json = await res.json();
    return json as Story;
  } catch (err) {
    console.error("Error cargando historia JSON:", err);
    return undefined;
  }
}

export type { Story, JourneyStep };
