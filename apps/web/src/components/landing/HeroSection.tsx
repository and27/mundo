"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";

export default function HeroSection() {
  return (
    // Alto por contenido, no por viewport: el min-h-screen anterior empujaba
    // el resto de la pagina fuera y dejaba medio pantallazo vacio.
    <section className="max-w-5xl mx-auto px-5 pt-36 pb-16 md:pt-44 md:pb-24 flex flex-col md:flex-row md:gap-12 items-center">
      <div className="text-center md:text-left md:flex-1">
        <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] tracking-tight font-extrabold leading-[1.05] text-balance text-white">
          Autorregulación emocional para la infancia.
        </h1>

        <p className="mt-5 text-white/70 max-w-xl mx-auto md:mx-0 text-lg leading-relaxed">
          Un método simple para acompañar emociones difíciles, basado en
          historias guiadas.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center md:items-start justify-center md:justify-start">
          <Button asChild size="lg">
            <Link href="/welcome">Acceder ahora</Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link href="#enfoque">Conocer el enfoque</Link>
          </Button>
        </div>
      </div>

      <div className="mt-12 md:mt-0 relative w-full max-w-[340px] md:max-w-none md:w-[360px] lg:w-[420px] shrink-0">
        <div className="relative aspect-square rounded-[var(--radius-card)] overflow-hidden mi-surface-2">
          <Image
            src="/images/kidWithYachayBed.png"
            alt="Una niña lee un cuento acompañada de Yachay"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 420px, (min-width: 768px) 360px, 340px"
          />
        </div>
      </div>
    </section>
  );
}
