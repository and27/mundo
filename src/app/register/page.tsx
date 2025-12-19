"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiShieldCheck } from "react-icons/hi2";
import { FiArrowRight } from "react-icons/fi";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import InfoPanel from "@/components/auth/AuthInfoPanel";
import Link from "next/link";
import Image from "next/image";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"register" | "login">("register");
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab: "register" | "login") => {
    if (tab === activeTab) return;
    setIsLoading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsLoading(false);
    }, 150);
  };

  const handleRegistrationSuccess = () => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveTab("login");
      setIsLoading(false);
    }, 600);
  };

  return (
    <main className="mi-canvas-auth min-h-screen flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-6xl"
      >
        <div className="mx-auto flex justify-center mb-2 md:mb-5 md:-mt-10">
          <Link href="/" aria-label="Ir al inicio">
            <Image
              src="/images/logo-mundo.png"
              width={140}
              height={140}
              alt="Mundo Interior"
              priority
            />
          </Link>
        </div>
        <div className="rounded-3xl md:border border-white/10 overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[640px]">
            <InfoPanel activeTab={activeTab} />

            <section className="flex-1 px-0 md:px-6 py-10 lg:px-12 lg:py-14 flex flex-col">
              <header className="mi-stack-md mb-12">
                <div className="flex rounded-2xl p-1 mi-surface-soft">
                  {(["register", "login"] as const).map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        disabled={isLoading}
                        className={[
                          "relative flex-1 py-3 px-2 md:px-6 rounded-xl text-sm font-semibold transition-all",
                          isActive
                            ? "mi-cta-primary shadow-lg"
                            : "text-white/70 hover:text-white hover:mi-accent-soft",
                        ].join(" ")}
                      >
                        {isLoading && isActive && (
                          <motion.span
                            className="absolute inset-0 bg-white/20"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                          />
                        )}
                        <span className="relative z-10 inline-flex items-center gap-2">
                          {tab === "register"
                            ? "Registrarme"
                            : "Iniciar sesión"}
                          {isActive && <FiArrowRight className="w-4 h-4" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </header>

              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="h-full"
                  >
                    {activeTab === "register" && (
                      <RegisterForm onSuccess={handleRegistrationSuccess} />
                    )}
                    {activeTab === "login" && <LoginForm />}
                  </motion.div>
                </AnimatePresence>
              </div>

              <footer className="mt-12 pt-6 border-t border-white/10 mi-stack-sm text-center">
                <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
                  <HiShieldCheck className="w-4 h-4" />
                  <span>Mundo es una plataforma confiable.</span>
                </div>
                <p className="text-white/40 text-xs">
                  Al continuar, aceptas nuestros términos y condiciones
                </p>
              </footer>
            </section>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
