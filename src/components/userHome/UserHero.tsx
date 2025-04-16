"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import ForestWithLights from "./ForestWithLights";
import Image from "next/image";

export default function UserHero() {
  const name = useOnboardingStore((state) => state.name) || "viajero";
  const router = useRouter();
  const [stage, setStage] = useState<"intro" | "select_mode">("intro");

  const handleCTA = () => setStage("select_mode");

  const handleSelectMode = (mode: "listen" | "play") => {
    const storyId = "el-viaje-de-amaru";
    router.push(`/cuentos/${storyId}?mode=${mode}`);
  };

  return (
    <section className="relative w-full max-h-screen flex justify-center  aspect-[6/9] sm:aspect-[9/8] md:aspect-[4/3]">
      {/* <h2 className="text-3xl font-bold mb-2 text-white">
        Bienvenido de nuevo, {name}. 🌱
      </h2>
      <p className="text-white/70 max-w-xl px-4 mb-6">
        Tu bosque interior está creciendo contigo. Hoy es un buen día para
        sembrar calma o comenzar una nueva historia.
      </p> */}

      <div className="absolute flex flex-col items-center pt-20">
        <div className="flex flex-col items-center text-center justify-center z-10 px-10 py-6 w-[90%] max-w-xl bg-white/10 backdrop-blur-md rounded-2xl text-white shadow-2xl border border-white/20 space-y-4 animate-fade-in transition-all ">
          {stage === "intro" && (
            <>
              <p className="text-xl font-semibold leading-relaxed">
                ¿Quieres escuchar una historia sobre cómo calmar tu corazón? 🌟
              </p>
              <button
                onClick={handleCTA}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-6 rounded-full transition duration-200 hover:scale-105"
              >
                Sí, quiero escucharla
              </button>
            </>
          )}

          {stage === "select_mode" && (
            <>
              <p className="text-xl font-semibold leading-relaxed">
                Este cuento puede contarse como una aventura… o como una
                historia para dormir. <br />
                ¿Cómo prefieres vivirlo?
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-1">
                <button
                  onClick={() => handleSelectMode("listen")}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-4 rounded-lg transition hover:scale-105"
                >
                  🌙 Escuchar para dormir
                </button>
                <button
                  onClick={() => handleSelectMode("play")}
                  className="flex-1 bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2.5 px-4 rounded-lg transition hover:scale-105"
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
            width={220}
            height={220}
            className="animate-float"
          />
        </div>
      </div>
      <ForestWithLights fireflyCount={5} />
    </section>
  );
}
