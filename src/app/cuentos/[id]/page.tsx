import { loadStory } from "@/lib/stories/server";
import { characters } from "@/lib/characters";
import CuentoClient from "@/components/dashboard/CuentoClient";

type Params = { id: string };

type PageProps = {
  params: Promise<Params>;
};

export default async function CuentoPage({ params }: PageProps) {
  const { id } = await params;
  const story = await loadStory(id);
  const guide = characters.find((g) => g.id === story?.guideId);

  if (!story) {
    return (
      <div className="text-white text-center pt-20">Historia no encontrada</div>
    );
  }

  if (!guide) {
    return (
      <div className="text-white text-center pt-20">Guía no encontrada</div>
    );
  }

  return <CuentoClient story={story} guide={guide} />;
}
