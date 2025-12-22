"use client";

import StoryCard from "@/components/dashboard/StoryCard";

type Guide = {
  id: string;
  // agrega aquí los campos que StoryCard realmente usa (title, imageUrl, etc.)
  // el tipo mínimo solo necesita id para favoritos/play
};

export function KidsStoriesSection({
  stories,
  allStories,
  favorites,
  onPlay,
  onToggleFavorite,
}: {
  stories: Guide[];
  allStories: Guide[];
  favorites: Set<string>;
  onPlay: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}) {
  const hasAnyStories = allStories.length > 0;
  const hasFiltered = stories.length > 0;

  if (hasFiltered) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-white text-2xl mi-section-title">Subtitle</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <StoryCard
              key={`kids-story-${story.id}-${index}`}
              guide={story as any}
              variant="kids"
              onPlay={() => onPlay(story.id)}
              isFavorite={favorites.has(story.id)}
              onToggleFavorite={() => onToggleFavorite(story.id)}
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
              <h3 className="text-2xl font-bold text-gray-700 mb-3">
                ¡Aún no tienes aventuras!
              </h3>
              <p className="text-gray-500 text-lg">
                Pídele a papá o mamá que cree una historia especial para ti
              </p>
            </>
          ) : (
            <>
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">
                No hay aventuras en esta sección
              </h3>
              <p className="text-gray-500 text-lg">
                Intenta con otro filtro para encontrar tus historias
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
