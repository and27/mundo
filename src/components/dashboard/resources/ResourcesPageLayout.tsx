"use client";

import React from "react";
import TravelGuidesSection from "./TravelGuidesSection";
import AdditionalResourcesLibrary from "./AdditionalResourcesLibrary";
import MethodologySection from "./MethodologySection";

const ResourcesPageLayout: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-condor">
          Recursos y Guías para Acompañantes de Mundo Interior
        </h1>
        <p className="text-lg text-condor/80 mt-2">
          Aquí encontrarás todo lo que necesitas para profundizar en la
          Metodología Mundo Interior (MIM) y enriquecer el viaje de bienestar
          emocional de tus exploradores.
        </p>
      </div>

      <section id="metodologia-mim" aria-labelledby="titulo-metodologia-mim">
        <MethodologySection />
      </section>

      <section id="guias-de-viaje" aria-labelledby="titulo-guias-de-viaje">
        <TravelGuidesSection />
      </section>

      <section
        id="biblioteca-recursos"
        aria-labelledby="titulo-biblioteca-recursos"
      >
        <AdditionalResourcesLibrary />
      </section>

      {/* futura sección para Comunidad y Soporte:
      <section id="comunidad-soporte" aria-labelledby="titulo-comunidad-soporte">
        <div className="mt-8 bg-black/10 p-5 rounded-lg border border-condor/30 shadow-md">
          <h2 id="titulo-comunidad-soporte" className="text-xl font-semibold text-white mb-3">
            Conecta con Otros Guías
          </h2>
          <p className="text-condor/90">
            Próximamente: Foros, FAQs y más para nuestra comunidad de Guías.
          </p>
        </div>
      </section>
      */}
    </div>
  );
};

export default ResourcesPageLayout;
