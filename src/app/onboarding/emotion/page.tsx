"use client";

import { useState } from "react";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { useRouter } from "next/navigation";
import SelectableEmotionGrid from "@/components/SelectableEmotion";

export default function Onboarding() {
  const { name, setEmotion: setGlobalEmotion } = useOnboardingStore();
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const router = useRouter();

  const handleSelect = (label: string) => {
    setSelectedEmotion(label);
    setGlobalEmotion(label); // Actualiza también el store global
  };

  const handleContinue = () => {
    if (selectedEmotion) {
      // Lógica futura: Podrías redirigir a una guía específica
      // basada en la emoción seleccionada.
      // Por ahora, redirige a una página genérica de guía.
      router.push("/onboarding/guide"); // O '/guide/default' o similar
    }
  };

  const userName = name || "viajero";

  return (
    // Aplicar un fondo y padding similar a otras pantallas si es necesario
    <section className="fade-in flex flex-col items-center justify-start min-h-screen text-white p-4 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">{`¿Cómo te sientes hoy, ${userName}?`}</h2>

      <SelectableEmotionGrid
        mode="before"
        onSelect={handleSelect}
        initialSelected={selectedEmotion ?? undefined} // Pasar estado local
        className="max-w-lg w-full mb-10" // Ajustar ancho y margen
      />

      <button
        onClick={handleContinue}
        disabled={!selectedEmotion} // Se activa solo si se selecciona una emoción
        className={`
          bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold
          py-3 px-10 rounded-full text-lg shadow-lg transition-all duration-200 ease-in-out
          ${
            !selectedEmotion
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-105"
          }
        `}
      >
        Continuar
      </button>
    </section>
  );
}
