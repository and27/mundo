"use client";

import React, { useState } from "react";
import Link from "next/link";
import OnboardingChecklist from "./OnboardingChecklist";
import AiGuideChat from "./ai/AiGuideChat";

const DashboardWelcomeSection = () => {
  const userName = "Guía";

  const onboardingSteps = [
    {
      id: "fundamentals",
      title: "Revisa los Fundamentos MIM",
      description:
        "Entiende el corazón de Mundo Interior para guiar con confianza.",
      link: "/parentDashboard?section=centroGuias&tab=fundamentos",
      isCompleted: true,
    },
    {
      id: "first_journey",
      title: "Prepara un Viaje Guiado",
      description:
        "Explora la guía del 'Sendero del Puma' para tu primera sesión.",
      link: "/parentDashboard?section=centroGuias&tab=guias-viajes&storyId=sendero-puma",
      isCompleted: false,
    },
    {
      id: "add_explorer",
      title: "Añade a tu Primer Explorador",
      description:
        "Crea el perfil de un niño para personalizar su experiencia.",
      link: "/parentDashboard?section=ninos",
      isCompleted: false,
    },
  ];

  const allOnboardingCompleted = onboardingSteps.every(
    (step) => step.isCompleted
  );

  const [showOnboarding, setShowOnboarding] = useState(!allOnboardingCompleted);

  const handleDismissOnboarding = () => {
    setShowOnboarding(false);
  };

  return (
    <div className="space-y-8 p-4 md:p-6">
      {showOnboarding && (
        <OnboardingChecklist
          steps={onboardingSteps}
          onDismiss={handleDismissOnboarding}
        />
      )}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-condor">
          ¡Hola, {userName}!
        </h1>
        <p className="text-lg text-condor/80 mt-2">
          Bienvenido/a a tu espacio en Mundo Interior. Aquí encontrarás las
          respuestas para ser el faro que guía las experiencias de tus
          exploradores.
        </p>
      </div>

      <AiGuideChat />

      <div className="text-center mt-10">
        <p className="text-condor/80 mb-2">¿Prefieres explorar a tu ritmo?</p>
        <Link
          href="/parentDashboard?section=centroGuias"
          className="text-jaguar font-semibold hover:underline text-lg"
        >
          Visita el Centro de Guías MIM completo
        </Link>
      </div>
    </div>
  );
};

export default DashboardWelcomeSection;
