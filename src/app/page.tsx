"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="px-4 md:px-8 min-h-screen x-4 py-8  mx-auto text-white">
      <div className="max-w-3xl mx-auto">
        <section className="flex flex-col md:flex-row my-16 gap-5 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Medita con tus guías sagrados
            </h1>
            <p className="text-sm text-white/60 max-w-md mb-6">
              Elige un camino, respira profundo, y deja que la sabiduría
              ancestral te acompañe.
            </p>
            <Link
              href="onboarding/name"
              className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition"
            >
              Iniciar meditación
            </Link>
          </div>
          <div className="mt-6">
            <Image
              src="/guides/amaru-transparent.png"
              alt="Guías en el bosque"
              width={300}
              height={300}
              className="animate-float rounded-lg ratio-1/1 object-cover"
            />
          </div>
        </section>

        {/* RECOMENDADAS */}
        <section className="my-20">
          <h2 className="text-2xl font-bold mb-6">Recomendadas para ti</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Aquí irían las cards de meditaciones pre-hechas */}
            <div className="bg-white/5 rounded-2xl p-4 text-white">
              <h4 className="font-bold text-lg">🌿 Calma Profunda</h4>
              <p className="text-sm text-white/60">Para soltar ansiedad</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 text-white">
              <h4 className="font-bold text-lg">🔥 Foco y energía</h4>
              <p className="text-sm text-white/60">Activa tu poder interior</p>
            </div>
            {/* ... */}
          </div>
        </section>
      </div>
    </main>
  );
}
