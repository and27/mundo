import React from "react";

type BenefitProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
};

const Benefit = ({ icon, title, subtitle }: BenefitProps) => (
  <div className="flex items-center gap-3">
    <span className="text-2xl">{icon}</span>

    <div className="leading-snug">
      <p className="font-semibold text-white">{title}</p>
      {subtitle && <p className="text-sm text-white/70">{subtitle}</p>}
    </div>
  </div>
);

const Divider = () => <span className="hidden md:block h-6 w-px bg-white/20" />;

const BenefitsBar = () => (
  <section
    aria-labelledby="benefits-title"
    className="
      mi-surface-dark
      mx-auto
      -mt-5
      mb-15
      max-w-4xl
      rounded-xl
      px-6
      py-7
      flex
      flex-col
      md:flex-row
      items-center
      justify-center
      gap-6
      md:gap-10
    "
  >
    <h2 id="benefits-title" className="sr-only">
      Beneficios clave de Mundo Interior
    </h2>

    <Benefit
      icon="😊"
      title="Más calma en momentos difíciles"
      subtitle="Baja la intensidad en pocos minutos"
    />

    <Divider />

    <Benefit
      icon="🧠"
      title="Mejor convivencia y transiciones"
      subtitle="Un lenguaje común en casa y escuela"
    />

    <Divider />

    <Benefit
      icon="🧭"
      title="Simple y guiado"
      subtitle="Historia → preguntas → práctica"
    />
  </section>
);

export default BenefitsBar;
