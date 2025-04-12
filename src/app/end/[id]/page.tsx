"use client";

import { useParams } from "next/navigation";
import { guides } from "@/lib/guides";
import QuoteBanner from "@/components/QuoteBanner";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SelectableEmotionGrid from "@/components/SelectableEmotion";

const EndPage = () => {
  const [emotion, setEmotion] = useState("");
  const { id } = useParams();

  const guide = guides.find((g) => g.id === id);

  if (!guide) return <div className="text-white p-10">Guía no encontrada</div>;

  return (
    <div className="max-w-xl mx-auto text-center px-4 pt-12 pb-24">
      <div className="mb-3 relative w-36 h-36 mx-auto rounded-full overflow-hidden border border-white drop-shadow-lg">
        <Image
          src={guide.imageTransparent}
          alt={guide.name}
          fill
          className="object-cover object-top"
        />
      </div>
      <h1 className="text-xl font-semibold mb-4">
        {guide.name} te deja una última enseñanza:
      </h1>

      <QuoteBanner text={guide.phrase} />

      <p className="mt-8 mb-4 text-white/80 text-sm">¿Cómo te sientes ahora?</p>

      <SelectableEmotionGrid
        mode="after"
        selected={emotion}
        onSelect={(e) => {
          setEmotion(e);
          console.log("Feedback post:", e);
        }}
      />

      <Link
        href="/"
        className="bg-yellow-400 text-black px-6 py-2 rounded-full shadow hover:bg-yellow-300 transition"
      >
        Volver al bosque
      </Link>
    </div>
  );
};

export default EndPage;
