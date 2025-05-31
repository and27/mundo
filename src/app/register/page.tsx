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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            <InfoPanel activeTab={activeTab} />
            <div className="bg-white/5 backdrop-blur-sm p-8 lg:p-12 flex flex-col">
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
