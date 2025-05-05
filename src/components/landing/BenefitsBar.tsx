import React from "react";

const Benefit = ({ icon, title, subtitle }) => (
  <div className="flex items-center gap-3">
    <span className="text-2xl">{icon}</span>
    <div className="leading-snug">
      <p className="font-semibold text-white">{title}</p>
      {subtitle && <p className="text-sm text-green-100/80">{subtitle}</p>}
    </div>
  </div>
);

const Divider = () => (
  <span className="hidden md:block h-6 w-px bg-green-200/30" />
);

const BenefitsBar = () => (
  <section
    aria-label="Beneficios clave"
    className="mx-auto max-w-4xl rounded-lg bg-black/20 backdrop-blur-sm px-6 py-4 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10"
  >
    <Benefit
      icon="😊"
      title="Adiós ansiedad"
      subtitle="Respira — la calma llega en minutos"
    />
    <Divider />

    <Benefit
      icon="🧠"
      title="Foco de superhéroe"
      subtitle="Mejora su atención y memoria"
    />
    <Divider />

    <Benefit
      icon="🧭"
      title="100 % guiado"
      subtitle="Solo presiona play, ¡nosotros hacemos el resto!"
    />
  </section>
);

export default BenefitsBar;
