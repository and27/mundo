"use client";

import { useEffect, useRef, useState } from "react";
import { guides } from "@/lib/characters";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function GuideSliderStep() {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [centeredIndex, setCenteredIndex] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const children = Array.from(container.children) as HTMLElement[];
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      children.forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const childCenter = rect.left + rect.width / 2;
        const distance = Math.abs(containerCenter - childCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setCenteredIndex(closestIndex);
      setSelectedGuide(guides[closestIndex].id);
    };

    handleScroll(); // initial run
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center">Elige tu guía</h2>

      <div
        ref={containerRef}
        className="overflow-x-scroll scroll-smooth flex gap-6 px-4 pb-4 snap-x snap-mandatory scrollbar-hide"
      >
        {guides.map((g, i) => (
          <div
            key={g.id}
            className={`snap-center shrink-0 w-52 transition-transform duration-300 ease-in-out cursor-pointer ${
              centeredIndex === i ? "scale-110" : "scale-100 opacity-70"
            }`}
            onClick={() => router.push(`/guide/${g.id}`)}
          >
            <div className="bg-white/10 rounded-2xl p-4 text-center">
              <Image
                src={g.image}
                alt={g.name}
                className="w-full h-56 object-cover rounded-xl mb-2"
              />
              <h3 className="text-white font-bold">{g.name}</h3>
              <p className="text-white/70 text-sm">{g.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => {
            if (selectedGuide) router.push(`/guide/${selectedGuide}`);
          }}
          disabled={!selectedGuide}
          className={`mt-8 px-6 py-2 rounded-full font-semibold transition ${
            selectedGuide
              ? "bg-red-400 text-black hover:bg-yellow-300 blur-xl scale-110 animate-pulse z-[-1]"
              : "bg-white/10 text-white/30 cursor-not-allowed"
          }`}
        >
          Empezar meditación
        </button>
      </div>
    </section>
  );
}
