"use client";

import { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiShieldCheck } from "react-icons/hi2";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import InfoPanel from "@/components/auth/AuthInfoPanel";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import ChipTabs from "@/components/ui/ChipTabs";

const containerVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.12,
    },
  },
} as const;

const panelVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
} as const;

const formVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
} as const;

function AuthPageContent() {
  const searchParams = useSearchParams();
  const initialTab =
    searchParams.get("tab") === "login" ? "login" : "register";
  const [activeTab, setActiveTab] = useState<"register" | "login">("register");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabChange = (tab: "register" | "login") => {
    if (tab === activeTab) return;
    setActiveTab(tab);
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
        variants={containerVariants}
        initial="hidden"
        animate="show"
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
            <motion.div variants={panelVariants} className="flex-1">
              <InfoPanel activeTab={activeTab} />
            </motion.div>

            <motion.section
              variants={panelVariants}
              className="flex-1 px-0 md:px-6 py-10 lg:px-12 lg:py-14 flex flex-col"
            >
              <header className="mi-stack-md mb-12">
                <ChipTabs
                  tabs={[
                    { id: "register", label: "Registrarme" },
                    { id: "login", label: "Iniciar sesion" },
                  ]}
                  activeTab={activeTab}
                  onTabChange={(tabId) =>
                    handleTabChange(tabId as "register" | "login")
                  }
                />
                {isLoading && (
                  <motion.span
                    className="mt-3 block h-1 w-full rounded-full bg-white/20"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                )}
              </header>

              <div className="flex-1">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={activeTab}
                    variants={formVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
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
                  Al continuar, aceptas nuestros tＳminos y condiciones
                </p>
              </footer>
            </motion.section>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <AuthPageContent />
    </Suspense>
  );
}
