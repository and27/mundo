"use client";

import Link from "next/link";
import { useOnboardingStore } from "@/store/useOnboardingStore";

export default function Name() {
  const name = useOnboardingStore((state) => state.name);
  const setName = useOnboardingStore((state) => state.setName);

  return (
    <div className="flex flex-col fade-in mt-20">
      <h2 className="text-2xl font-bold mb-6">¿Cómo te llamas?</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Escribe tu nombre"
        className="w-full p-4 bg-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
      />
      <Link
        href="emotion"
        className="w-fit mt-6 bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
      >
        Continuar
      </Link>
    </div>
  );
}
