"use client";

import { useRouter } from "next/navigation";
import ProgramHero from "../program/ProgramHero";
import ProgramMainCard from "../program/ProgramMainCard";
import CreateStoryCTA from "../program/CreateStoryCTA";

export default function ProgramCatalogSection() {
  const router = useRouter();

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="mi-section mi-stack-lg">
          <ProgramHero
            title="Emociones en Acción"
            subtitle="Desarrolla el idioma de las emociones · 8 a 12 años"
          />
          <ProgramMainCard
            title="Emotional Literacy"
            subtitle="Programa Central"
            description="Un viaje práctico donde los niños exploran, entienden y aprenden a expresar sus emociones con claridad, seguridad y confianza."
            image="/images/program-cover.png"
            onEnter={() =>
              router.push("/parentDashboard?section=program&view=module-1")
            }
          />
          <CreateStoryCTA
            onClick={() => router.push("/parentDashboard?section=asistente")}
          />
        </div>
      </div>
    </section>
  );
}
