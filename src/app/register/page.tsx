"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiShieldCheck } from "react-icons/hi2";
import { FiArrowRight } from "react-icons/fi";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import InfoPanel from "@/components/auth/AuthInfoPanel";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"register" | "login">("register");
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab: "register" | "login") => {
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
    }, 2000);
  };

  return (
    <div className="p-2 md:p-6 flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            <InfoPanel activeTab={activeTab} />
            <div className="flex-1 bg-white/5 backdrop-blur-sm  px-4 py-8 lg:p-12 flex flex-col">
              <div className="mb-12">
                <div className="flex bg-white/10 rounded-2xl p-1 backdrop-blur-sm">
                  {["register", "login"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() =>
                        handleTabChange(tab as "register" | "login")
                      }
                      disabled={isLoading}
                      className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 relative overflow-hidden ${
                        activeTab === tab
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {isLoading && activeTab === tab && (
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                      )}
                      <span className="relative z-10">
                        {tab === "register" ? "Registrarme" : "Iniciar Sesión"}
                      </span>
                      {activeTab === tab && (
                        <FiArrowRight className="inline-block ml-2 w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1"
                  >
                    {activeTab === "register" && (
                      <RegisterForm onSuccess={handleRegistrationSuccess} />
                    )}
                    {activeTab === "login" && <LoginForm />}
                  </motion.div>
                </AnimatePresence>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 pt-6 border-t border-white/10"
              >
                <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
                  <HiShieldCheck className="w-4 h-4" />
                  <span>Plataforma segura y confiable</span>
                </div>
                <div className="text-center mt-2">
                  <span className="text-white/40 text-xs">
                    Al continuar, aceptas nuestros términos y condiciones
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
