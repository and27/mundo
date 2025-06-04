"use client";

import React from "react";
import Link from "next/link";
import AiGuideChat from "@/components/dashboard/ai/AiGuideChat"; // Ajusta la ruta si es necesario

const DashboardWelcomeSection = () => {
  const userName = "Guía"; // Esto podría venir de un contexto, sesión o props

  return (
    <>
      <div className="space-y-8 md:p-6">
        <div>
          <h1 className="text-xl md:text-3xl md:text-4xl font-bold text-foreground">
            ¡Hola, {userName}!
          </h1>
          <p className="md:text-lg text-foreground/80 mt-2 max-w-3xl">
            Bienvenido/a a tu espacio en Mundo Interior. Aquí encontrarás las
            respuestas para ser el faro que guía las experiencias de tus
            exploradores.
          </p>
        </div>

        <AiGuideChat />

        <div className="text-center mt-10 pt-6 border-t border-white/10">
          <p className="text-foreground/70 mb-2">
            ¿Prefieres explorar a tu ritmo todos los recursos?
          </p>
          <Link
            href="/parentDashboard?section=centroGuias"
            className="text-color-accent-gold font-semibold hover:underline text-lg"
          >
            Visita el Centro de Guías MIM completo
          </Link>
        </div>
      </div>
    </>
  );
};

export default DashboardWelcomeSection;
