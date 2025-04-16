"use client";
import { useParams } from "next/navigation";
import { stories } from "@/lib/stories";
import { guides } from "@/lib/guides";
import BreathingPlayer from "@/components/breathing/BreathingPlayer";
import ForestWithLights from "@/components/userHome/ForestWithLights";
import GuideHeader from "@/components/breathing/GuideHeader";
import Game from "@/app/game/page";

export default function CuentoPage() {
  const { id } = useParams();
  const story = stories.find((s) => s.id === id);

  if (!story) return <p>Historia no encontrada</p>;

  const guide = guides.find((g) => g.id === story.guideId);
  if (!guide) return <p>Guía no encontrada</p>;

  return (
    <>
      <section className="relative w-full h-screen flex justify-center  aspect-[6/9] sm:aspect-[9/8] md:aspect-[4/3]">
        <div className="absolute -top-10 z-20 min-h-screen flex flex-col items-center justify-start text-white text-center">
          <GuideHeader image={guide.imageTransparent} />
          <div className="w-5xl flex flex-col items-center gap-5 bg-white/10 backdrop-blur-md rounded-2xl text-white shadow-2xl border border-white/20">
            {/* <BreathingPlayer guide={guide} mode="play" /> */}
            <Game />
          </div>
        </div>
        <ForestWithLights fireflyCount={5} />
      </section>
    </>
  );
}
