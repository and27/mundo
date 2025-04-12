"use client";

import { useParams } from "next/navigation";
import { guides } from "@/lib/guides";
import CustomAudioPlayer from "@/components/AudioPlayer";
import Link from "next/link";
import Image from "next/image";

const GuidePage = () => {
  const { id } = useParams();

  const audioSrc = `/audio/micro-meditation.mp3`;
  const guide = guides.find((g) => g.id === id);

  if (!guide) return <div className="text-white p-10">Guía no encontrada</div>;

  return (
    <section className="-mt-5 text-center flex flex-col gap-3 justify-center min-h-screen mx-auto">
      <div className="max-w-3xl mx-auto">
        <div className="mb-3 relative w-36 h-36 mx-auto rounded-full overflow-hidden border border-white drop-shadow-lg">
          <Image
            src={guide.imageTransparent}
            alt={guide.name}
            fill
            className="object-cover object-top"
          />
        </div>
        <h1 className="text-xl font-bold">{guide.name}</h1>
        <p className="italic text-white/80 text-center px-4">
          “{guide.phrase}”
        </p>

        {/* Audio Player */}
        <div className="w-full max-w-md  mb-8">
          <CustomAudioPlayer src={audioSrc} />
        </div>

        {/* Descripción */}
        <p className="text-sm text-white/70 text-center max-w-sm mb-5">
          {guide.description}
        </p>
        <Link
          href={`/end/${guide.id}`}
          className="border py-2 px-4 rounded text-white/70 text-sm"
        >
          Finalizar meditación
        </Link>
      </div>
    </section>
  );
};

export default GuidePage;
