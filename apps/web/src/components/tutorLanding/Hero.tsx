"use client";

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="max-w-4xl mx-auto flex flex-col justify-center md:flex-row px-5 lg:px-0 my-10 md:mb-16 md:-mt-5 md:gap-6 items-center">
      <div className="text-center md:text-left">
        <h1 className="text-4xl tracking-tight font-extrabold mb-4 leading-tight">
          Desbloquea <br />
          la <span className="leading-none">calma</span> y el{" "}
          <span className="leading-none">potencial</span> <br />
          en cada niño y niña
        </h1>
        <p className="text-white/60 max-w-md mb-10 text-lg">
          Te ofrecemos un enfoque único y recursos listos para nutrir su
          fortaleza interior.
        </p>

        <Link
          href={"login"}
          className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition"
        >
          Empieza a Guiar
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
