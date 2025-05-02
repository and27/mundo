"use client";

import Link from "next/link";

const quickOptions = [
  {
    icon: "🧘",
    title: "Meditación rápida",
    desc: "5 minutos para volver a ti",
    href: "/guide/yachay", // Temporal, puedes cambiar a ruta random o más lógica
  },
  {
    icon: "🌙",
    title: "Dormir mejor",
    desc: "Cierra el día con calma",
    href: "/guide/hatun",
  },
  {
    icon: "💭",
    title: "Reflexión guiada",
    desc: "Explora tu mundo interior",
    href: "/guide/kuntur",
  },
];

const QuickStartButtons = () => {
  return (
    <section className="my-12">
      <h3 className="text-xl font-bold mb-4">¿Qué necesitas hoy?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickOptions.map((o) => (
          <Link
            key={o.title}
            href={o.href}
            className="bg-white/5 hover:bg-white/10 transition p-5 rounded-2xl text-center"
          >
            <h4 className="text-lg font-semibold mb-1">
              {o.icon} {o.title}
            </h4>
            <p className="text-sm text-white/60">{o.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default QuickStartButtons;
