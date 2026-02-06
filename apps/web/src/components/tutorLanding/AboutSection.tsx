import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="bg-black/30 backdrop-blur-sm  my-20 py-[7rem] mx-auto text-center">
      <div className="mx-auto px-4 flex flex-col items-center gap-5">
        <h2 className="text-2xl font-bold mb-4">🌱 Acerca de Mundo Interior</h2>
        <p className="text-white/70 max-w-2xl leading-relaxed mb-7">
          Imagina un espacio donde cada niño descubre la magia de su propio
          mundo interior. Lo hacemos a padres, educadores y terapeutas para
          guiar a niños de 8 a 12 años en un viaje transformador. Fusionamos
          ciencia psicológica, sabiduría ancestral y un marco ético robusto.
          Creamos experiencias que reducen la ansiedad, generan autoconfianza y
          maximizan el potencial de cada niño y niña.
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
