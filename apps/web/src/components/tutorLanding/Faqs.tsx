"use client";

import { useState } from "react";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: "need-experience",
    question: "¿Mi hijo necesita saber meditar antes?",
    answer:
      "¡Para nada! Cada aventura empieza con instrucciones paso a paso y juegos de respiración. Solo necesita curiosidad y 5 minutos.",
  },
  {
    id: "guided-sessions",
    question: "¿Las sesiones son guiadas?",
    answer:
      "Sí. Una voz cálida y música envolvente lo acompañan de inicio a fin—es imposible perderse.",
  },
  {
    id: "kids-safe",
    question: "¿Es realmente apta para niños y adolescentes?",
    answer:
      "Totalmente. Contenido cocreado con psicólogos infantiles (8-12 años), sin anuncios ni compras sorpresa.",
  },
];

const FAQs = () => {
  const [active, setActive] = useState<number>(0);

  return (
    <section className="my-30 max-w-2xl mx-auto h-[360px]">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Preguntas frecuentes
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white/5 rounded-xl p-4 transition">
            <button
              onClick={() => setActive(active === index ? -1 : index)}
              className="w-full text-left font-semibold text-white flex justify-between items-center"
            >
              {faq.question}
              <span className="text-yellow-300">
                {active === index ? "-" : "+"}
              </span>
            </button>
            {active === index && (
              <p className="text-white/70 text-sm mt-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
