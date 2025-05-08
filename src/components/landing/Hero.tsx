"use client";

import { useOnboardingStore } from "@/store/useOnboardingStore";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const { name } = useOnboardingStore();
  return (
    <section className="flex flex-col justify-center md:flex-row px-10 my-10 md:mb-16 md:mt-0 md:gap-6 items-center">
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-bold mb-4 leading-tight">
          Calma interior para niños
        </h1>
        <p className="text-white/60 max-w-md mb-4">
          Un viaje guiado para soñar, sentir y dormir mejor
        </p>
        <p className="text-sm text-white/50 italic mb-8">
          Cierra los ojos por un instante... <br />
          ¿Estás listo para volver a ti?
        </p>
        <Link
          href={name ? "/onboarding/emotion" : "/onboarding/name"}
          className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition"
        >
          Iniciar viaje
        </Link>
      </div>
      <div className="mt-6">
        <Image
          src="/images/childrenHero.webp"
          alt="Guías en el bosque"
          width={400}
          height={600}
          className="animate-float rounded-lg object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
