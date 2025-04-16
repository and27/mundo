"use client";

import { useState } from "react";
import JourneyCard from "@/components/library/JourneyCard";
import JourneyEmptyState from "@/components/library/JourneyEmptyState";
import JourneyTabs from "@/components/library/JourneyTabs";
import LibraryHero from "@/components/library/LibraryHero";

const journeys = [
  {
    id: "puma",
    title: "Fuerza interior",
    description: "Activa tu poder con Yachay Puma",
    image: "/guides/puma.png",
    category: "explorar",
  },
  {
    id: "amaru",
    title: "Sanar emociones",
    description: "Transita emociones con Amaru",
    image: "/guides/amaru.png",
    category: "sentir",
  },
  {
    id: "hatun",
    title: "Descanso profundo",
    description: "Duerme mejor con Hatun",
    image: "/guides/hatun.png",
    category: "descansar",
  },
];

const categories = [
  { key: "todos", label: "Todos" },
  { key: "sentir", label: "💛 Sentir" },
  { key: "explorar", label: "🌀 Explorar" },
  { key: "descansar", label: "🌙 Descansar" },
];

export default function LibraryPage() {
  const [selected, setSelected] = useState("todos");

  const filtered =
    selected === "todos"
      ? journeys
      : journeys.filter((j) => j.category === selected);

  return (
    <main className="min-h-screen px-4 max-w-5xl mx-auto text-white">
      <LibraryHero />
      <JourneyTabs
        categories={categories}
        selected={selected}
        onSelect={setSelected}
      />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {filtered.map((j) => (
            <JourneyCard key={j.id} {...j} />
          ))}
        </div>
      ) : (
        <JourneyEmptyState />
      )}
    </main>
  );
}
