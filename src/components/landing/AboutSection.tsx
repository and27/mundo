import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="flex flex-col items-center gap-5 my-30 max-w-3xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">🌱 Acerca de Mundo Interior</h2>
      <p className="text-white/70 text-sm leading-relaxed">
        No es solo una app de meditación. Es un espacio de sanación colectiva,
        una herramienta para reconectar con tu esencia y con las memorias
        ancestrales del continente. Aquí, la tecnología se pone al servicio del
        alma.
      </p>
      <Image
        src="/images/all.png"
        alt="Guías en el bosque"
        width={500}
        height={500}
        className="rounded-lg"
      />
    </section>
  );
};

export default AboutSection;
