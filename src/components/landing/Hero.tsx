"use client";

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="flex flex-col justify-center md:flex-row my-16 gap-6 items-center">
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-bold mb-4 leading-tight">
          Comienza tu viaje interior
        </h1>
        <p className="text-white/60 max-w-md mb-4">
          Un viaje para sentir,sanar y despertar.
        </p>
        <p className="text-sm text-white/50 italic mb-8">
          Cierra los ojos por un instante... <br />
          ¿Estás listo para volver a ti?
        </p>
        <Link
          href="/onboarding/name"
          className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition"
        >
          Iniciar viaje
        </Link>
      </div>
      <div className="mt-6">
        <Image
          src="/guides/amaru-transparent.png"
          alt="Guías en el bosque"
          width={300}
          height={300}
          className="animate-float rounded-lg object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
