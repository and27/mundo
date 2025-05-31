"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GuideCard from "@/components/GuideCard";
import { guides } from "@/lib/guides";
import { Guide } from "@/types/guides";
import Button from "@/components/ui/Button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiSparkles } from "react-icons/hi2";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 20 },
  },
};

export default function Onboarding() {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectGuide = useCallback((guide: Guide) => {
    setSelectedGuide(guide);
    setIsLoading(false);
  }, []);

  const handleNavigationStart = useCallback(() => {
    if (selectedGuide) {
      setIsLoading(true);
    }
  }, [selectedGuide]);

  return (
    <motion.div
      className="flex flex-col items-center w-full max-w-6xl mx-auto px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-medium">
            <HiSparkles className="w-5 h-5 text-white" />
          </div>
          <h1
            id="guide-selection-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Elige tu Guía
          </h1>
        </div>
        <p className="text-foreground/70 text-base sm:text-lg max-w-md">
          Selecciona el compañero perfecto para tu aventura de autoconocimiento.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8"
      >
        {guides.map((guide) => (
          <GuideCard
            key={guide.id}
            {...guide}
            selected={selectedGuide?.id === guide.id}
            onSelect={() => handleSelectGuide(guide)}
          />
        ))}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="w-full max-w-sm text-center"
      >
        <div className="min-h-[110px]">
          <AnimatePresence>
            {selectedGuide && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="glass-light rounded-xl p-4 mb-6"
                role="status"
              >
                <h3 className="font-semibold text-foreground">
                  Has elegido a {selectedGuide.name}
                </h3>
                <p className="text-sm text-foreground/70">
                  {selectedGuide.description ||
                    "¡Una excelente elección para tu viaje!"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedGuide ? "active" : "inactive"}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {selectedGuide ? (
              <Link
                href={`/cuentos/${selectedGuide.id}`}
                className="block"
                onClick={handleNavigationStart}
              >
                <Button
                  disabled={isLoading}
                  className="w-full min-h-[52px] shadow-strong hover:scale-[1.03] transition-all duration-200 ease-out disabled:opacity-70 disabled:scale-100"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-3">
                      <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
                      Cargando...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      <HiSparkles className="w-5 h-5" />
                      Empezar meditación
                    </span>
                  )}
                </Button>
              </Link>
            ) : (
              <Button
                disabled
                className="w-full min-h-[52px] font-medium text-base glass-light border-2 border-dashed border-white/20 text-foreground/50 rounded-xl"
              >
                Selecciona una guía para continuar
              </Button>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
