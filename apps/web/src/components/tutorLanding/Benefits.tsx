"use client";

import Link from "next/link";

const options = [
  {
    icon: "💛",
    title: "Sentir",
    desc: "Explora tu mundo emocional y transforma lo que duele.",
    href: "/onboarding/mode?type=sentir",
  },
  {
    icon: "🌀",
    title: "Explorar",
    desc: "Visualizaciones guiadas para descubrir nuevas posibilidades.",
    href: "/onboarding/mode?type=explorar",
  },
  {
    icon: "🌙",
    title: "Descansar",
    desc: "Encuentra calma, duerme profundo y suelta el día.",
    href: "/onboarding/mode?type=descansar",
  },
];

const Benefits = () => {
  return (
    <section className="my-30">
      <h2 className="text-2xl font-bold mb-6 text-center">
        ¿A dónde quieres ir hoy?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {options.map(({ icon, title, desc, href }) => (
          <Link
            key={title}
            href={href}
            className="bg-white/5 rounded-2xl p-6 hover:bg-white/10"
          >
            <h4 className="text-xl font-bold mb-2">
              {icon} {title}
            </h4>
            <p className="text-white/60 text-sm">{desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
