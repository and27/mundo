"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiCheck } from "react-icons/hi2";

const steps = [
  {
    title: "Historia",
    duration: "2–4 min",
    description:
      "(Infancia escucha / adulto guía) Situación real + personaje + emoción.",
  },
  {
    title: "Nombrar",
    duration: "1 min",
    description:
      "(Adulto pregunta / infancia responde) ¿Qué siento? ¿Dónde lo siento? ¿Qué necesito?",
  },
  {
    title: "Calmar el cuerpo",
    duration: "1–2 min",
    description:
      "(Ambos practican) Respirar / presión suave / movimiento lento / anclaje al aquí y ahora para bajar la intensidad.",
  },
  {
    title: "Cierre",
    duration: "30 seg",
    description:
      "(Adulto modela) Una frase puente + una acción pequeña para continuar (en casa o en el aula).",
  },
];

function StepNumber({ n, active }: { n: number; active: boolean }) {
  return (
    <div
      className={[
        "shrink-0 w-10 h-10 rounded-xl grid place-items-center font-bold",
        "border transition-colors",
        active
          ? "bg-white/70 border-white/25 text-black/80"
          : "bg-white/20 border-white/10 text-white/80",
      ].join(" ")}
      aria-hidden="true"
    >
      {n}
    </div>
  );
}

export default function HowItWorksSection() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="demo" className="mi-section px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mi-section-header">
          <h2 className="mi-section-title text-2xl md:text-3xl font-bold text-white">
            De la emoción intensa a la calma, paso a paso
          </h2>
        </div>

        {/* Steps */}
        <div className="mi-stack-md">
          {steps.map((step, index) => {
            const active = index === currentStep;

            return (
              <motion.div
                key={index}
                animate={{
                  scale: active ? 1.02 : 1,
                  opacity: active ? 1 : 0.85,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className={[
                  "rounded-2xl p-6 transition-colors",
                  active ? "mi-card border" : "mi-card",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <StepNumber n={index + 1} active={active} />

                    <div>
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-semibold text-white">
                          {step.title}
                        </h3>
                        <span className="text-white/55 text-sm">
                          {step.duration}
                        </span>
                      </div>

                      <p className="mt-2 text-white/70 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {active && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="text-emerald-300 pt-1"
                      >
                        <HiCheck className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
