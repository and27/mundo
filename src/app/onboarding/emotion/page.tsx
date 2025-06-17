"use client";

import { useState } from "react";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { useRouter } from "next/navigation";
import SelectableEmotionGrid from "@/components/SelectableEmotion";
import Button from "@/components/ui/Button";
import { emotionsBeforeJourney } from "@/lib/emotionsData"; // Importa la lista específica

export default function OnboardingEmotionPage() {
  const { name, setEmotion: setGlobalEmotion } = useOnboardingStore();
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null); // Sigue guardando el label aquí por ahora
  const router = useRouter();

  const handleSelect = (label: string) => {
    setSelectedEmotion(label);
    setGlobalEmotion(label);
  };

  const handleContinue = () => {
    if (selectedEmotion) {
      router.push("/onboarding/guide");
    }
  };

  const userName = name || "viajero";

  return (
    <section className="bg-black/50 backdrop-blur-sm rounded-lg fade-in flex flex-col items-start md:items-center justify-start text-white sm:py-10 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8">{`¿Cómo te sientes hoy, ${userName}?`}</h2>

      <SelectableEmotionGrid
        emotions={emotionsBeforeJourney}
        mode="before"
        onSelect={handleSelect}
        initialSelected={selectedEmotion ?? undefined}
        className="max-w-2xl w-full mb-5"
      />

      <Button onClick={handleContinue} disabled={!selectedEmotion}>
        Continuar
      </Button>
    </section>
  );
}
