"use client";

import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<"register" | "login">("register");

  return (
    <div className="min-h-screen flex flex-col items-center mt-10 md:mt-0 md:p-5">
      <div className="w-full max-w-4xl rounded-lg py-10 md:py-12 px-5 md:px-10 shadow-lg backdrop-blur-sm bg-black/30 md:bg-black/20">
        <div className="grid md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-8 items-start">
          <div className="md:sticky md:top-10">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">
              ¿Cómo funciona <i>Mundo Interior?</i>
            </h1>
            <div className="text-white space-y-4 text-base md:text-lg">
              <p>
                Con nuestra forma de acompañar, te guiamos para que tus hijos o
                estudiantes puedan:
              </p>
              <ol className="list-decimal list-inside space-y-3 pl-2">
                <li>
                  <strong>Explorar Emociones:</strong> A través de cuentos
                  andinos interactivos y culturalmente resonantes.
                </li>
                <li>
                  <strong>Encontrar la Calma:</strong> Con ejercicios de
                  respiración y mindfulness simples (5-10 min).
                </li>
                <li>
                  <strong>Cultivar su Fortaleza Interior:</strong> Reforzando su
                  autoconocimiento y resiliencia.
                </li>
              </ol>
              <p className="pt-4">
                {activeTab === "register"
                  ? "Crea tu cuenta de Guía y empieza a transformar su bienestar emocional."
                  : "Inicia sesión para continuar esta aventura de acompañamiento."}
              </p>
            </div>
          </div>

          <div className="w-full">
            <div className="flex mb-6 border-b border-white/10">
              <button
                onClick={() => setActiveTab("register")}
                className={`py-3 px-5 text-lg font-semibold focus:outline-none transition-colors duration-200 ${
                  activeTab === "register"
                    ? "text-yellow-400 border-b-2 border-yellow-400"
                    : "text-gray-400 hover:text-yellow-300"
                }`}
              >
                Registrarme
              </button>
              <button
                onClick={() => setActiveTab("login")}
                className={`py-3 px-5 text-lg font-semibold focus:outline-none transition-colors duration-200 ${
                  activeTab === "login"
                    ? "text-yellow-400 border-b-2 border-yellow-400"
                    : "text-gray-400 hover:text-yellow-300"
                }`}
              >
                Iniciar Sesión
              </button>
            </div>

            <div>
              {activeTab === "register" && (
                <RegisterForm
                  onSuccess={() => {
                    setTimeout(() => setActiveTab("login"), 2000);
                  }}
                />
              )}
              {activeTab === "login" && <LoginForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
