"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Journey = {
  id: string;
  title: string;
  desc: string;
  href: string;
  img?: string;
};

export default function LastJourneys() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);

  /** fake fetch */
  useEffect(() => {
    const ctrl = new AbortController();

    (async () => {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 1000));
      if (!ctrl.signal.aborted) {
        setJourneys([
          {
            id: "calma",
            title: "🌿 Calma profunda",
            desc: "Para soltar ansiedad",
            href: "/cuentos/yachay",
          },
          {
            id: "foco",
            title: "🔥 Foco interior",
            desc: "Activa tu energía",
            href: "/cuentos/hatun",
          },
          {
            id: "respira",
            title: "🌊 Respiración consciente",
            desc: "Vuelve al cuerpo",
            href: "/cuentos/amaru",
          },
          {
            id: "claridad",
            title: "☀️ Claridad matutina",
            desc: "Empieza el día presente",
            href: "/cuentos/amaru",
          },
        ]);
        setIsLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, []);

  const scrollBy = (direction: "left" | "right") => {
    const node = listRef.current;
    if (!node) return;
    const offset = direction === "left" ? -240 : 240;
    node.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="my-12" aria-labelledby="recent-journeys-heading">
      <div className="flex items-center justify-between mb-4">
        <h3
          id="recent-journeys-heading"
          className="text-xl font-bold text-white"
        >
          Continúa tu aventura
        </h3>

        {/* Flechas visibles en ≥md */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scrollBy("left")}
            aria-label="Scroll a la izquierda"
            className="p-1 rounded-full bg-white/10 hover:bg-white/20"
          >
            <FiChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => scrollBy("right")}
            aria-label="Scroll a la derecha"
            className="p-1 rounded-full bg-white/10 hover:bg-white/20"
          >
            <FiChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div
        ref={listRef}
        role="list"
        aria-busy={isLoading}
        className="scrollbar-hide flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mb-2 snap-x snap-mandatory"
      >
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="animate-pulse bg-white/10 rounded-2xl h-28 w-[200px] flex-shrink-0"
            />
          ))
        ) : journeys.length ? (
          journeys.map((j) => (
            <Link
              key={j.id}
              role="listitem"
              href={j.href}
              aria-label={`Ir a meditación ${j.title}`}
              className="flex-shrink-0 w-[200px] md:w-[240px] bg-gradient-to-t
                         from-white/20 to-white/10 backdrop-blur-md rounded-2xl
                         p-5 hover:bg-black/20 transition-colors duration-200 snap-start"
            >
              {j.img && (
                <Image
                  src={j.img}
                  alt=""
                  loading="lazy"
                  className="w-10 h-10 mb-2 rounded-md object-cover"
                />
              )}
              <h4 className="font-semibold text-white truncate">{j.title}</h4>
              <p className="text-sm text-white/70">{j.desc}</p>
            </Link>
          ))
        ) : (
          <p className="text-sm text-white/60 bg-white/5 p-4 rounded-lg">
            Aún no has iniciado ningún viaje. ¡Explora el bosque!
          </p>
        )}
      </div>
    </section>
  );
}
