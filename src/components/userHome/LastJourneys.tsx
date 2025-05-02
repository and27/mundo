"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Journey {
  title: string;
  desc: string;
  href: string;
  img?: string;
}

const LoadingSkeleton = ({ className = "h-24" }: { className?: string }) => (
  <div className={`animate-pulse bg-white/10 rounded-lg ${className}`}></div>
);

const LastJourneys = () => {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      // Simular fetch
      setJourneys([
        {
          title: "🌿 Calma profunda",
          desc: "Para soltar ansiedad",
          href: "/guide/yachay",
        },
        {
          title: "🔥 Foco interior",
          desc: "Activa tu energía",
          href: "/guide/kuntur",
        },
        {
          title: "🌊 Respiración consciente",
          desc: "Vuelve al cuerpo",
          href: "/guide/amaru",
        },
        {
          title: "☀️ Claridad Matutina",
          desc: "Empieza el día presente",
          href: "/guide/inti",
        },
      ]);
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="my-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Tus últimos viajes</h3>
      </div>
      {isLoading ? (
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          <LoadingSkeleton className="h-24 min-w-[200px]" />
          <LoadingSkeleton className="h-24 min-w-[200px]" />
          <LoadingSkeleton className="h-24 min-w-[200px]" />
        </div>
      ) : journeys.length === 0 ? (
        <p className="text-sm text-white/60 bg-white/5 p-4 rounded-lg">
          Aún no has iniciado ningún viaje. ¡Explora el bosque!
        </p>
      ) : (
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mb-2 snap-x snap-mandatory">
          {journeys.map((m) => (
            <Link
              key={m.title}
              href={m.href}
              aria-label={`Ir a meditación ${m.title}`}
              className="flex-shrink-0 w-[200px] bg-gradient-to-t from-white/20 to-white/10 backdrop-blur-md rounded-2xl p-5 hover:bg-black/10 transition-colors duration-200 snap-start block"
            >
              <h4 className="font-bold text-md text-white truncate">
                {m.title}
              </h4>
              <p className="text-sm text-white/60">{m.desc}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default LastJourneys;
