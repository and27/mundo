"use client";

import { useState } from "react";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { useRouter } from "next/navigation";
import SelectableEmotionGrid from "@/components/SelectableEmotion";
import Button from "@/components/ui/Button";

export default function OnboardingEmotionPage() {
  const { name, setEmotion: setGlobalEmotion } = useOnboardingStore();
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
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
    <section className="fade-in flex flex-col items-center justify-start min-h-screen text-white p-4 pt-16 sm:pt-20 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8">{`¿Cómo te sientes hoy, ${userName}?`}</h2>

      <SelectableEmotionGrid
        mode="before"
        onSelect={handleSelect}
        initialSelected={selectedEmotion ?? undefined}
        className="max-w-lg w-full mb-10"
      />

      <Button onClick={handleContinue} disabled={!selectedEmotion}>
        Continuar
      </Button>
    </section>
  );
}
