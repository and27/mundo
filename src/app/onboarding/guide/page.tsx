"use client";

import { useState } from "react";
import GuideCard from "@/components/GuideCard";
import { guides } from "@/lib/guides";
import { useRouter } from "next/navigation";
import { Guide } from "@/types/guides";

export default function Onboarding() {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const router = useRouter();

  return (
    <div className="fade-in">
      <h2 className="text-2xl font-bold mb-6">Elige tu guía</h2>
      <div className="grid md:grid-cols-5 gap-3 pb-4">
        {guides.map((g) => (
          <GuideCard
            key={g.id}
            {...g}
            selected={selectedGuide?.id === g.id}
            onSelect={() => setSelectedGuide(g)}
          />
        ))}
      </div>
      <button
        onClick={() => {
          router.push(`/guide/${selectedGuide?.id}`);
        }}
        className="mt-6 bg-yellow-500 text-sky px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
      >
        Empezar meditación
      </button>
    </div>
  );
}
