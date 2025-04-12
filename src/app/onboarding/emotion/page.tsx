"use client";

import SelectableEmotionGrid from "@/components/SelectableEmotion";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import Link from "next/link";

export default function Onboarding() {
  const { setEmotion, name } = useOnboardingStore();

  return (
    <section className="fade-in">
      <h2 className="text-2xl font-bold mb-6">{`¿Cómo te sientes hoy ${name}?`}</h2>
      <SelectableEmotionGrid mode="before" onSelect={(e) => setEmotion(e)} />
      <Link
        href="guide"
        className="mt-6 bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
      >
        Continuar
      </Link>
    </section>
  );
}
