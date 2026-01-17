"use client";

import { KidsStoryTile } from "./KidsStoryTile";
import { GuideWithCharacter } from "@/types/ai";

export function KidsStoriesSection({
  stories,
  allStories,
  favorites,
  onPlay,
  onToggleFavorite,
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
        <h2 className="text-white mi-text-title mi-section-title">Subtitle</h2>

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

  // Empty states
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        <div className="bg-white rounded-3xl p-12 shadow-lg">
          {!hasAnyStories ? (
            <>
              <div className="text-8xl mb-6">📚</div>
              <h3 className="mi-text-title text-gray-700 mb-3">
                ¡Aún no tienes aventuras!
              </h3>
              <p className="mi-text-body text-gray-500">
                Pídele a papá o mamá que cree una historia especial para ti
              </p>
            </>
          ) : (
            <>
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="mi-text-title text-gray-700 mb-3">
                No hay aventuras en esta sección
              </h3>
              <p className="mi-text-body text-gray-500">
                Intenta con otro filtro para encontrar tus historias
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

