import "server-only";

import type { Story } from "@/types/story";
import { supabase } from "@/lib/supabaseServer";
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

  try {
    const { data, error } = await supabase.storage
      .from("stories")
      .download(`${id}.json`);

    if (error) {
      console.error("Error descargando de Supabase:", error);
      return undefined;
    }

    const text = await data.text();
    const json = JSON.parse(text);
    return json as Story;
  } catch (err) {
    console.error("Error cargando historia JSON desde Supabase:", err);
    return undefined;
  }
}
