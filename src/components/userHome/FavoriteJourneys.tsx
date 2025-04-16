"use client";

import Link from "next/link";

const favorites = [
  {
    title: "💖 Abrazo interior",
    desc: "Sanar al niño interno",
    href: "/guide/amaru",
  },
  {
    title: "🦋 Transformación",
    desc: "Visualización para liberar miedos",
    href: "/guide/kuntur",
  },
];

const FavoriteJourneys = () => {
  return (
    <section className="my-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Tus favoritos</h3>
        <Link
          href="/library?tab=favoritos"
          className="text-sm text-yellow-400 hover:underline"
        >
          Ver todos
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {favorites.map((f) => (
          <Link
            key={f.title}
            href={f.href}
            className="bg-white/5 hover:bg-white/10 transition p-4 rounded-xl"
          >
            <h4 className="font-semibold">{f.title}</h4>
            <p className="text-sm text-white/60">{f.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FavoriteJourneys;
