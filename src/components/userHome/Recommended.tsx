"use client";

import Link from "next/link";

const recommendations = [
  {
    title: "🌊 Respiración profunda",
    desc: "Para soltar tensión acumulada",
    href: "/guide/puma",
  },
  {
    title: "✨ Luz interior",
    desc: "Activa tu energía vital",
    href: "/guide/kuntur",
  },
];

const RecommendedForYou = () => {
  return (
    <section className="my-12">
      <h3 className="mi-text-subtitle mb-4">Recomendadas para ti</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recommendations.map((r) => (
          <Link
            key={r.title}
            href={r.href}
            className="bg-white/5 hover:bg-white/10 p-4 rounded-xl transition"
          >
            <h4 className="mi-text-label">{r.title}</h4>
            <p className="mi-text-body-sm text-white/60">{r.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecommendedForYou;
