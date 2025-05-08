import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="bg-black/30 backdrop-blur-sm  my-20 py-[7rem] mx-auto text-center">
      <div className="mx-auto px-4 flex flex-col items-center gap-5">
        <h2 className="text-2xl font-bold mb-4">🌱 Acerca de Mundo Interior</h2>
        <p className="text-white/70 max-w-2xl leading-relaxed mb-7">
          No es solo una app de meditación. Es un espacio de sanación colectiva,
          una herramienta para reconectar con tu esencia y con las memorias
          ancestrales del continente. Aquí, la tecnología se pone al servicio
          del alma.
        </p>
        <Image
          src="/images/all.webp"
          alt="Guías en el bosque"
          width={540}
          height={540}
          className="rounded-lg"
        />
      </div>
    </section>
  );
};

export default AboutSection;
