"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <section
      className="
        mt-20 md:mt-0
        my-10
        md:my-0
        min-h-screen
        max-w-4xl
        mx-auto
        flex
        flex-col
        justify-center
        md:flex-row
        px-5
        lg:px-0
        md:gap-10
        items-center
      "
    >
      <div className="text-center md:text-left">
        <h1 className="text-4xl md:text-5xl tracking-tight font-extrabold mb-4 leading-tight text-white">
          Autorregulación emocional <br />
          para la infancia.
        </h1>

        <p className="text-white/70 max-w-xl mb-8 text-lg">
          Un método simple para acompañar emociones difíciles, basado en
          historias guiadas.
        </p>

        <div className="flex flex-col md:flex-row gap-3 items-center md:items-start">
          <Button asChild>
            <Link href="/welcome">Acceder ahora</Link>
          </Button>
          <Link
            href="#enfoque"
            className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white/70 hover:text-white underline underline-offset-4"
          >
            Conocer el enfoque
          </Link>
        </div>
      </div>

      <div
        className="
          m-10
          relative
          w-[270px]
          h-[270px]
          md:min-w-[320px]
          md:h-[320px]
          lg:w-[620px]
          lg:h-[380px]
          rounded-full
          overflow-hidden
          mi-surface-soft
        "
      >
        <Image
          src="/images/kidWithYachayBed.png"
          alt="Mundo Interior"
          fill
          priority
          className="object-cover"
          sizes="(min-width: 768px) 320px, 220px"
        />
      </div>
    </section>
  );
}
