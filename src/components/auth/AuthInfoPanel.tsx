import { memo, useEffect, useState } from "react";
import { HiHeart, HiLightBulb, HiShieldCheck } from "react-icons/hi2";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: <HiHeart className="w-6 h-6" />,
    title: "Explorar emociones",
    description:
      "A través de cuentos andinos interactivos y culturalmente resonantes.",
  },
  {
    icon: <HiLightBulb className="w-6 h-6" />,
    title: "Encontrar la calma",
    description:
      "Con ejercicios simples de respiración y atención plena (5–10 min).",
  },
  {
    icon: <HiShieldCheck className="w-6 h-6" />,
    title: "Fortaleza interior",
    description: "Reforzando el autoconocimiento y la resiliencia emocional.",
  },
];

type InfoPanelProps = {
  activeTab: string;
};

const InfoPanel: React.FC<InfoPanelProps> = memo(({ activeTab }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % benefits.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden md:flex flex-1 p-12 flex-col justify-center gap-10">
      <motion.header
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mi-stack-sm"
      >
        <h2 className="text-3xl font-bold text-white leading-tight">
          ¿Cómo funciona{" "}
          <span className="text-[color:var(--color-action-400)] italic">
            Mundo Interior
          </span>
          ?
        </h2>
        <p className="text-white/80 max-w-lg">
          Acompañamos a la infancia para que pueda:
        </p>
      </motion.header>

      <div className="mi-stack-md">
        {benefits.map((benefit, index) => {
          const active = index === currentStep;

          return (
            <motion.div
              key={benefit.title}
              animate={
                active
                  ? { scale: 1.02, opacity: 1 }
                  : { scale: 1, opacity: 0.75 }
              }
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className={[
                "rounded-2xl p-6 flex items-start justify-between gap-6",
                active ? "mi-surface-soft" : "mi-card",
              ].join(" ")}
            >
              <div className="flex items-start gap-4 max-w-md">
                <div className="shrink-0 text-white/90 mt-0.5">
                  {benefit.icon}
                </div>
                <div className="mi-stack-sm">
                  <h3 className="font-semibold text-white">{benefit.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});

InfoPanel.displayName = "InfoPanel";

export default InfoPanel;
