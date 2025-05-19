"use client";

import Button from "@/components/ui/Button";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";

export default function Home() {
  const { name } = useOnboardingStore();
  const [isLoading, setIsLoading] = useState<boolean>();

  const PrimaryButtonContent = isLoading ? (
    <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
  ) : (
    <>
      <FaPlay className="mr-2" />
      Iniciar viaje
    </>
  );

  const handleNavigationStart = () => {
    setIsLoading(true);
  };

  return (
    <main className="bg-black/30 backdrop-blur-sm  min-h-screen flex items-center py-8 text-white">
      <div className="px-10 max-w-3xl text-center -mt-16 flex flex-col gap-5 items-center h-full items-center mx-auto">
        <Image
          className="rounded-full ratio-1/1 w-50 h-50 object-cover"
          alt=""
          width="100"
          height="100"
          src="/guides/yachay3d.webp"
        />
        <h1 className="text-3xl md:text-6xl">
          Bienvenido/a a <br />
          tu Mundo Interior
        </h1>
        <h2 className="text-base md:text-2xl">
          ¿Listo/a para tu primer viaje de descubrimiento?
        </h2>
        <Link
          className="w-60"
          href={name ? "/onboarding/emotion" : "/onboarding/name"}
        >
          <Button className="w-full" onClick={handleNavigationStart}>
            {PrimaryButtonContent}
          </Button>
        </Link>
        <Link
          href="/register"
          className="w-60 px-7 py-3 font-semibold rounded-full bg-magic/20 text-white hover:brightness-95"
        >
          Soy padre o educador
        </Link>
      </div>
    </main>
  );
}
