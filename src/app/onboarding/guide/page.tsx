"use client";

import { useState } from "react";
import GuideCard from "@/components/GuideCard";
import { guides } from "@/lib/guides";
import { useRouter } from "next/navigation";
import { Guide } from "@/types/guides";
import Button from "@/components/ui/Button";

export default function Onboarding() {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const router = useRouter();

  return (
    <div className="flex flex-col  px-2 fade-in">
      <h2 className="text-2xl font-bold mb-6">Elige tu guía</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-8 sm:gap-2 md:gap-3 pb-4">
        {guides.map((g) => (
          <GuideCard
            key={g.id}
            {...g}
            selected={selectedGuide?.id === g.id}
            onSelect={() => setSelectedGuide(g)}
          />
        ))}
      </div>
      <Button
        onClick={() => {
          router.push(`/cuentos/${selectedGuide?.id}`);
        }}
        className="w-fit self-center mt-4"
      >
        Empezar meditación
      </Button>
    </div>
  );
}
