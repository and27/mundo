"use client";

import { useState } from "react";

const faqs = [
  {
    question: "¿Necesito experiencia previa para meditar?",
    answer:
      "No, nuestras meditaciones están diseñadas para principiantes y también para quienes ya han recorrido un camino interior.",
  },
  {
    question: "¿Las meditaciones son guiadas?",
    answer:
      "Sí, cada sesión cuenta con una voz suave y acompañamiento musical para ayudarte a entrar en un estado de presencia.",
  },
  {
    question: "¿Puedo usar la app si soy niño o adolescente?",
    answer:
      "Sí. Hemos creado contenidos específicos para jóvenes, con lenguajes y ritmos adaptados a su edad y sensibilidad.",
  },
];

const FAQs = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="my-30 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Preguntas frecuentes
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white/5 rounded-xl p-4 transition">
            <button
              onClick={() => setActive(active === index ? null : index)}
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
