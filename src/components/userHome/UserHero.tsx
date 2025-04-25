"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../ui/Button";
import { useOnboardingStore } from "@/store/useOnboardingStore";

export default function UserHero() {
  const router = useRouter();
  const [stage, setStage] = useState<"intro" | "select_mode">("intro");
  const name = useOnboardingStore((state) => state.name);

  const handleCTA = () => setStage("select_mode");

  const handleSelectMode = (mode: "listen" | "play") => {
    const storyId = "amaru";
    router.push(`/cuentos/${storyId}?mode=${mode}`);
  };

  return (
    <section className="flex flex-col">
      <h2 className="pt-5 text-center text-xl md:text-3xl font-bold mt-5 text-white">
        Que bueno verte de nuevo, {name}. 🌱
      </h2>
      {/*  <p className="text-white/70 max-w-xl px-4 mb-6">
        Tu bosque interior está creciendo contigo. Hoy es un buen día para
        sembrar calma o comenzar una nueva historia.
      </p> */}

      <div className="flex flex-col items-center pt-5 ">
        <div className="w-full  flex flex-col items-start md:text-center justify-center z-10 px-5 md:px-10 py-4 md:py-6 w-[90%] max-w-xl bg-white/10 backdrop-blur-md rounded-2xl text-white shadow-2xl space-y-4 animate-fade-in transition-all ">
          {stage === "intro" && (
            <>
              <p className="leading-6 text-lg md:text-xl font-semibold">
                ¿Quieres escuchar una historia sobre cómo calmar tu corazón? 🌟
              </p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleCTA}>Sí, quiero escuchar</Button>
                <Button variant="secondary">Cambiar de guía</Button>
              </div>
            </>
          )}

          {stage === "select_mode" && (
            <>
              <p className="text-xl font-semibold leading-relaxed">
                Este cuento puede contarse como una aventura… o como una
                historia para dormir. <br />
                ¿Cómo prefieres vivirlo?
              </p>
              <div className="w-full flex flex-col sm:flex-row justify-center gap-3 pt-1">
                <button
                  onClick={() => handleSelectMode("listen")}
                  className="rounded-full flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-3 transition hover:scale-105"
                >
                  🌙 Escuchar para dormir
                </button>
                <button
                  onClick={() => handleSelectMode("play")}
                  className="rounded-full flex-1 bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2.5 px-3 transition hover:scale-105"
                >
                  ✨ Vivir la aventura
                </button>
              </div>
            </>
          )}
        </div>
        <div className="z-10">
          <Image
            src="/guides/amaru-transparent.png"
            alt="Guía espiritual"
            width={200}
            height={200}
            className="animate-float"
          />
        </div>
      </div>
    </section>
  );
}
