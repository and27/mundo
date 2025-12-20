"use client";
import React, { useState, useCallback, useMemo, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import Button from "@/components/ui/Button";
import { HiSparkles } from "react-icons/hi2";

const inspirationalQuotes = [
  "Cada emoción es un tesoro por descubrir.",
  "Tu mundo interior está lleno de magia.",
  "Descubre la fortaleza que llevas dentro.",
  "Un viaje de mil emociones empieza con un solo paso.",
];

/* ======================================================
   WELCOME PANEL
====================================================== */

const WelcomePanel: React.FC = memo(() => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((p) => (p + 1) % inspirationalQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center text-center px-8 py-10">
      <div className="absolute -top-40 md:-top-50 max-w-32 md:max-w-48">
        <Image
          priority
          src="/images/yachwithkuntur.png"
          alt="Yachay, guía de Mundo Interior"
          width={180}
          height={180}
          className="rounded-full object-contain"
        />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-3xl md:text-4xl font-bold text-white tracking-tight"
      >
        Bienvenido a <br /> Mundo Interior
      </motion.h1>

      <div className="md:mt-6 hidden md:flex h-12 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentQuote}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.4 }}
            className="text-white/70 italic"
          >
            “{inspirationalQuotes[currentQuote]}”
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
});
WelcomePanel.displayName = "WelcomePanel";

/* ======================================================
   ACTION PANEL
====================================================== */

type ActionPanelProps = {
  name: string;
  isLoading: boolean;
  onStartJourney: () => void;
};

const ActionPanel: React.FC<ActionPanelProps> = memo(
  ({ name, isLoading, onStartJourney }) => {
    const primaryButtonContent = useMemo(
      () =>
        isLoading ? (
          <div className="flex items-center gap-3">
            <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
            <span>Preparando…</span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <FaPlay className="w-4 h-4" />
            <span>Esuchar historia</span>
          </div>
        ),
      [isLoading]
    );

    return (
      <div className="flex flex-col items-center justify-center text-center px-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mi-stack-md"
        >
          <p className="text-white/70 max-w-sm">
            Un espacio para escuchar historias y acompañar emociones.
          </p>
        </motion.div>

        <motion.div
          className="w-full max-w-xs mt-8"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link href={name ? "/onboarding/emotion" : "/onboarding/name"}>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onStartJourney}
              className="mb-4"
            >
              <Button className="w-full" disabled={isLoading} variant="primary">
                {primaryButtonContent}
              </Button>
            </motion.div>
          </Link>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/register"
              className="
                w-full inline-flex items-center justify-center gap-3
                px-6 py-3 rounded-xl font-semibold
                glass-light text-white/80 hover:text-white
                transition-colors underline
              "
            >
              <FiUsers className="w-5 h-5" />
              <span>Iniciar sesión</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }
);
ActionPanel.displayName = "ActionPanel";

export default function WelcomeExperience() {
  const { name } = useOnboardingStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigationStart = useCallback(() => {
    setIsLoading(true);
  }, []);

  return (
    <main className="mi-canvas-app min-h-screen flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl mx-auto"
      >
        <div className="border border-white/20 grid md:grid-cols-2 rounded-2xl py-5">
          <WelcomePanel />
          <ActionPanel
            name={name}
            isLoading={isLoading}
            onStartJourney={handleNavigationStart}
          />
        </div>
      </motion.div>
    </main>
  );
}
