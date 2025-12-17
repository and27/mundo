"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: "need-experience",
    question: "¿Necesito experiencia o formación para usarlo?",
    answer:
      "No. Todo viene guiado con pasos claros: una historia corta, preguntas simples y una práctica breve para acompañar lo que se siente.",
  },
  {
    id: "guided-sessions",
    question: "¿Cómo se usa en casa o en el aula?",
    answer:
      "En 4 pasos: Historia → Nombrar → Calmar el cuerpo → Cierre. Puedes aplicarlo en transiciones, antes de dormir, o cuando hay emociones intensas.",
  },
  {
    id: "ages",
    question: "¿Para qué edades está pensado?",
    answer:
      "Funciona mejor cuando hay acompañamiento adulto. En esta etapa estamos enfocados en infancia escolar (por ejemplo 8–12), y seguiremos ampliando por rangos.",
  },
];

export default function FAQs() {
  const [open, setOpen] = useState<string>(faqs[0]?.id ?? "");

  return (
    <section className="mi-section px-4">
      <div className="mx-auto max-w-3xl">
        {/* Header de sección */}
        <div className="mi-section-header text-center">
          <h2 className="mi-section-title text-2xl md:text-3xl font-bold text-white">
            Preguntas frecuentes
          </h2>
          <p className="mi-section-subtitle text-white/70">
            Respuestas claras sobre el método y cómo usarlo en casa o en el
            aula.
          </p>
        </div>

        {/* Contenido */}
        <div className="mi-stack-lg">
          {faqs.map((faq) => {
            const isOpen = open === faq.id;

            return (
              <div key={faq.id} className="mi-card transition-colors">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? "" : faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${faq.id}-content`}
                  className="w-full flex items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="text-white font-semibold text-base md:text-lg">
                    {faq.question}
                  </span>

                  <span className="text-white/70 text-2xl leading-none select-none">
                    {isOpen ? "–" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${faq.id}-content`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-white/70 text-sm md:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
