import Image from "next/image";
import { HiHeart, HiSquares2X2, HiCalendarDays } from "react-icons/hi2";

const principles = [
  {
    icon: <HiHeart className="w-6 h-6" />,
    title: "Aceptación",
    desc: "Validamos lo que se siente; no corregimos la emoción.",
  },
  {
    icon: <HiSquares2X2 className="w-6 h-6" />,
    title: "Simplicidad",
    desc: "Pocas herramientas, claras y repetibles.",
  },
  {
    icon: <HiCalendarDays className="w-6 h-6" />,
    title: "Consistencia",
    desc: "Prácticas breves, sostenibles en la vida real.",
  },
];

export default function WhatIsSection() {
  return (
    <section id="enfoque" className="mi-section px-4">
      <div className="mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative w-full flex justify-center lg:justify-start">
          <div className="w-full max-w-sm rounded-3xl overflow-hidden mi-card">
            <div className="relative w-full aspect-[4/6]">
              <Image
                src="/images/kidWithYachay.png"
                alt="Mundo Interior"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 380px, 90vw"
              />
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="max-w-xl">
          {/* Header */}
          <div className="mi-section-header">
            <h2 className="mi-section-title text-2xl md:text-4xl font-bold text-white">
              ¿Qué es Mundo Interior?
            </h2>
          </div>

          {/* Texto */}
          <div className="mi-stack-sm">
            <p className="text-white/75 leading-relaxed">
              Mundo Interior es un sistema de autorregulación emocional para la
              infancia, diseñado para implementarse en casa y en la escuela, a
              través de historias y prácticas simples.
            </p>

            <p className="text-white/75 leading-relaxed">
              Combinamos historias cortas, preguntas guía y prácticas simples
              para crear un lenguaje común entre la infancia y los adultos que
              acompañan.
            </p>
          </div>

          {/* Principios */}
          <div className="mi-stack-sm mt-8">
            {principles.map((p) => (
              <div key={p.title} className="mi-card p-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 text-white/85 mt-0.5">{p.icon}</div>
                  <div>
                    <h3 className="font-semibold text-white">{p.title}</h3>
                    <p className="mt-1 text-white/70">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-white/55">
            Diseñado para aplicarse en casa y en el aula, sin complicaciones.
          </p>
        </div>
      </div>
    </section>
  );
}
