"use client";

import Image from "next/image";
import { KidsStoryTile } from "./KidsStoryTile";
import { GuideWithCharacter } from "@/types/ai";

export function KidsStoriesSection({
  stories,
  allStories,
  onPlay,
}: {
  stories: GuideWithCharacter[];
  allStories: GuideWithCharacter[];
  favorites: Set<string>;
  onPlay: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}) {
  const hasAnyStories = allStories.length > 0;
  const hasFiltered = stories.length > 0;

  if (hasFiltered) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="mi-text-kid-title text-white mi-legible mi-section-title">
          Tus cuentos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((guide) => (
            <KidsStoryTile
              key={guide.id}
              guide={guide}
              onPlay={() => onPlay(guide.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  // Vacio: un guia esperando, no un emoji sobre una tarjeta blanca.
  return (
    <div className="max-w-xl mx-auto px-6 py-10 text-center">
      <div className="relative inline-block">
        <span aria-hidden className="mi-ground-shadow bottom-2 h-5 w-32" />
        <Image
          src="/guides/yachay-transparent.png"
          alt=""
          width={180}
          height={180}
          className="relative w-[180px] h-[180px] object-contain"
        />
      </div>

      {!hasAnyStories ? (
        <>
          <h3 className="mi-text-kid-title text-white mi-legible mt-4">
            Todavía no tienes cuentos
          </h3>
          <p className="mi-text-body text-white/75 mi-legible mt-2">
            Pídele a papá o mamá que cree uno para ti. Yachay te espera aquí.
          </p>
        </>
      ) : (
        <>
          <h3 className="mi-text-kid-title text-white mi-legible mt-4">
            Aquí no hay nada
          </h3>
          <p className="mi-text-body text-white/75 mi-legible mt-2">
            Prueba con otro botón de arriba.
          </p>
        </>
      )}
    </div>
  );
}
