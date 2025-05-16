"use client";

import { useOnboardingStore } from "@/store/useOnboardingStore";

export default function PersonalizedHeader() {
  const userName = useOnboardingStore((state) => state.name) || "Explorador";

  return (
    <header className="w-full flex flex-col md:flex-row items-center justify-center md:justify-between">
      <h1 className="md:text-left text-xl md:text-3xl font-bold text-white">
        Que bueno verte <br /> de nuevo, {userName}. 🌱
      </h1>
    </header>
  );
}
