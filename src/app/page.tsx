"use client";
import React, { useState, useCallback, useMemo, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { FiUsers, FiBookOpen } from "react-icons/fi";
import Button from "@/components/ui/Button";
import { HiSparkles } from "react-icons/hi2";

const inspirationalQuotes = [
  "Cada emoción es un tesoro por descubrir.",
  "Tu mundo interior está lleno de magia.",
  "Descubre la fortaleza que llevas dentro.",
  "Un viaje de mil emociones empieza con un solo paso.",
];
type WelcomePanelType = {
  name: string;
};
const WelcomePanel: React.FC<WelcomePanelType> = memo(({ name }) => {
  const [currentQuote, setCurrentQuote] = useState(0);
  console.log(name);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % inspirationalQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 flex flex-col justify-center items-center text-center h-full">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
        className="-mt-70 md:-mt-110 absolute mb-6"
      >
        <Image
          priority
          className="rounded-full w-60 h-60 md:w-80 md:h-80 object-contain shadow-strong"
          alt="Yachay - Tu guía interior"
          width="300"
          height="300"
          src="/images/yachwithkuntur.png"
        />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-3xl lg:text-4xl font-bold text-foreground mb-2"
      >
        Bienvenidos a <br />
        mundo interior
      </motion.h1>

      <div className="mt-3 hidden md:flex h-12 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentQuote}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="text-foreground/70 italic"
          >
            &ldquo;{inspirationalQuotes[currentQuote]}&rdquo;
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
});
WelcomePanel.displayName = "WelcomePanel";

type ActionPanelType = {
  name: string;
  isLoading: boolean;
  onStartJourney: () => void;
};

const ActionPanel: React.FC<ActionPanelType> = memo(
  ({ name, isLoading, onStartJourney }) => {
    const primaryButtonContent = useMemo(
      () =>
        isLoading ? (
          <div className="flex items-center justify-center gap-3">
            <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
            <span>Preparando...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <FaPlay className="w-4 h-4" />
            <span>Iniciar viaje</span>
          </div>
        ),
      [isLoading]
    );

    return (
      <div className="bg-color-primary-900/40 p-8 md:p-12 flex flex-col justify-center items-center text-center rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none h-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-center flex gap-3">
            <HiSparkles className="w-10 h-10 text-color-accent-gold mb-4" />
            <h2 className="hidden md:flex w-fit text-2xl lg:text-3xl font-bold text-foreground mb-3">
              Tu Aventura Comienza
            </h2>
          </div>
          <p className="text-foreground/80 mb-8 max-w-sm">
            Estás a un solo clic de explorar un universo de emociones, calma y
            autoconocimiento.
          </p>
        </motion.div>

        <motion.div
          className="w-full max-w-xs"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href={name ? "/onboarding/emotion" : "/onboarding/name"}
            passHref
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartJourney}
              className="block mb-4"
            >
              <Button
                className="w-full transition-all duration-300 hover:shadow-lg"
                disabled={isLoading}
              >
                {primaryButtonContent}
              </Button>
            </motion.a>
          </Link>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/register"
              className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 font-semibold rounded-xl glass-light text-foreground/80 hover:text-foreground hover:bg-glass-bg-medium transition-all duration-300"
            >
              <FiUsers className="w-5 h-5" />
              <span>Soy padre o educador</span>
              <FiBookOpen className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }
);
ActionPanel.displayName = "ActionPanel";

export default function Home() {
  const { name } = useOnboardingStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigationStart = useCallback(() => {
    setIsLoading(true);
  }, []);

  return (
    <main className="text-white  min-h-screen w-full bg-gradient-background flex items-center justify-center p-3  ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl mx-auto"
      >
        <div className="bg-black/50 backdrop-blur-sm grid md:grid-cols-2 py-10 rounded-2xl">
          <WelcomePanel name={name} />
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
