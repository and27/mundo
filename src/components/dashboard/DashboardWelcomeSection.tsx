"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import OnboardingChecklist from "./OnboardingChecklist";

interface SimulatedResource {
  id: string;
  title: string;
  description: string;
  link: string;
  type: "Historia Interactiva" | "Guía" | "Artículo";
}

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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SimulatedResource[]>([]);

  const handleDismissOnboarding = () => {
    setShowOnboarding(false);
  };

  const handleSimulatedSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchResults([]); // Limpiar resultados anteriores

    const lowerSearchTerm = searchTerm.toLowerCase();

    if (
      lowerSearchTerm.includes("ansiedad") ||
      lowerSearchTerm.includes("explorar ansiedad")
    ) {
      setSearchResults([
        {
          id: "historia-ansiedad-1",
          title: "El Misterio de las Mariposas Inquietas",
          description: "Una aventura para entender y calmar la ansiedad.",
          link: "/cuentos/explorando-la-ansiedad", // Enlace a tu historia
          type: "Historia Interactiva",
        },
      ]);
    } else if (lowerSearchTerm.includes("tristeza")) {
      setSearchResults([
        {
          id: "guia-tristeza-1",
          title: "Navegando la Nube Gris",
          description: "Ejercicios y cuentos para acompañar la tristeza.",
          link: "/guias/acompanar-tristeza",
          type: "Guía",
        },
      ]);
    }
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
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          ¡Hola, {userName}!
        </h1>
        <p className="text-lg text-foreground/80 mt-2 max-w-3xl">
          Bienvenido/a a tu espacio en Mundo Interior. Aquí encontrarás las
          respuestas para ser el faro que guía las experiencias de tus
          exploradores.
        </p>
      </div>

      {/* SECCIÓN DE BÚSQUEDA SIMULADA */}
      <div className="bg-background/50 p-6 rounded-2xl shadow-lg border border-white/10 glass-medium">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          ¿Necesitas ayuda con algo específico?
        </h2>
        <p className="text-foreground/70 mb-4 text-sm">
          {"Prueba buscar 'ayuda con ansiedad' o 'manejar tristeza'."}
        </p>
        <form onSubmit={handleSimulatedSearch} className="flex gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ej: Explorar la ansiedad en niños..."
            className="flex-grow p-3 rounded-lg bg-black/30 border border-white/20 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-color-accent-magic transition-all"
          />
          <button
            type="submit"
            className="bg-gradient-primary text-white font-semibold px-6 py-3 rounded-lg hover:brightness-110 transition-all duration-300 shadow-md"
          >
            Buscar
          </button>
        </form>

        {searchResults.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              Resultados sugeridos:
            </h3>
            {searchResults.map((resource) => (
              <Link
                href={resource.link}
                key={resource.id}
                className="block group"
              >
                <div className="p-4 rounded-xl bg-black/20 hover:bg-black/40 border border-white/20 hover:border-color-accent-magic transition-all duration-300 shadow-sm hover:shadow-lg">
                  <span className="text-xs text-color-accent-magic font-medium bg-color-accent-magic/10 px-2 py-0.5 rounded-full">
                    {resource.type}
                  </span>
                  <h4 className="text-md font-semibold text-foreground mt-1 group-hover:text-color-accent-magic transition-colors">
                    {resource.title}
                  </h4>
                  <p className="text-sm text-foreground/70 mt-1">
                    {resource.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* <AiGuideChat /> */}

      <div className="text-center mt-10">
        <p className="text-foreground/80 mb-2">
          ¿Prefieres explorar a tu ritmo?
        </p>
        <Link
          href="/parentDashboard?section=centroGuias"
          className="text-color-accent-gold font-semibold hover:underline text-lg"
        >
          Visita el Centro de Guías MIM completo
        </Link>
      </div>
    </div>
  );
};

export default DashboardWelcomeSection;
