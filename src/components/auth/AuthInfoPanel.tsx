import { memo, useEffect, useState } from "react";
import { HiHeart, HiLightBulb, HiShieldCheck } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck } from "react-icons/fi";

const benefits = [
  {
    icon: <HiHeart className="w-6 h-6" />,
    title: "Explorar Emociones",
    description:
      "A través de cuentos andinos interactivos y culturalmente resonantes",
    color: "from-rose-400 to-pink-500",
  },
  {
    icon: <HiLightBulb className="w-6 h-6" />,
    title: "Encontrar la Calma",
    description:
      "Con ejercicios de respiración y mindfulness simples (5-10 min)",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: <HiShieldCheck className="w-6 h-6" />,
    title: "Cultivar Fortaleza Interior",
    description: "Reforzando su autoconocimiento y resiliencia",
    color: "from-emerald-400 to-teal-500",
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
    <div className="flex-1 bg-gradient-to-br from-indigo-600/90 to-purple-700/90 backdrop-blur-sm p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden h-full">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
          ¿Cómo funciona{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300 italic">
            Mundo Interior?
          </span>
        </h1>
        <p className="text-white/90 text-lg">
          Con nuestra forma de acompañar, te guiamos para que tus hijos o
          estudiantes puedan:
        </p>
      </motion.div>

      <div className="space-y-4">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            animate={
              index === currentStep
                ? { scale: 1.05, opacity: 1 }
                : { scale: 1, opacity: 0.7 }
            }
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`flex items-start gap-4 p-4 rounded-2xl ${
              index === currentStep ? "bg-white/20 shadow-lg" : "bg-white/5"
            }`}
          >
            <div
              className={`p-3 rounded-xl bg-gradient-to-r ${benefit.color} shadow-lg`}
            >
              {benefit.icon}
            </div>
            <div className={`flex-row max-w-80 `}>
              <h3 className="text-white font-semibold text-lg mb-1">
                {benefit.title}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
            <AnimatePresence>
              {index === currentStep && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="text-green-300"
                >
                  <FiCheck className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-4 bg-white/10 rounded-2xl border border-white/20"
      >
        <p className="text-white/90 text-center">
          {activeTab === "register"
            ? "🌟 Crea tu cuenta de Guía y empieza a transformar su bienestar emocional"
            : "🚀 Inicia sesión para continuar esta aventura de acompañamiento"}
        </p>
      </motion.div>
    </div>
  );
});

InfoPanel.displayName = "InfoPanel";

export default InfoPanel;
