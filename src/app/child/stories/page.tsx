"use client";

import { useState } from "react";
import ModeToggle from "@/components/dashboard/ModeToggle";
import { useSavedGuides } from "@/hooks/useSavedGuides";
import StoryCard from "@/components/dashboard/StoryCard";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ChildStoriesPage() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const { savedGuides, isLoaded } = useSavedGuides();
  const router = useRouter();
  console.log(savedGuides);

  const filteredStories = savedGuides.filter((story) => {
    if (activeFilter === "favoritos") return favorites.has(story.id);
    if (activeFilter === "nuevos") return false; // TODO: agregar lógica de "nuevos" basada en fecha
    return true;
  });

  const handlePlayStory = (storyId: string) => {
    router.push(`/cuentos/${storyId}`);
  };

  const handleToggleFavorite = (guideId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(guideId)) {
        newFavorites.delete(guideId);
      } else {
        newFavorites.add(guideId);
      }
      return newFavorites;
    });
  };

  if (!isLoaded) {
    return (
      <main className="min-h-screen w-full bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-12 shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400 mx-auto mb-4"></div>
          <p className="text-sky-600 font-semibold text-center">
            Cargando tus aventuras...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100">
      <div className="bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400 relative">
        <div className="w-full relative flex justify-between items-start px-6 py-12">
          <Image
            src={"/images/forest-bg-dark.png"}
            alt=""
            fill
            className="absolute object-cover"
          />
          <h1 className="z-100 text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            Vamos por una nueva aventura
          </h1>
          <div className="z-100 bg-black/50 rounded-lg backdrop-blur-sm">
            <ModeToggle variant="header" />
          </div>
        </div>
      </div>

      <div className="sticky top-0 bg-white/70 backdrop-blur-xl border-b border-blue-100 px-6 py-6 z-10">
        <div className="max-w-4xl mx-auto flex justify-center gap-3">
          {[
            { key: "todos", label: "Todos", icon: "🌟" },
            { key: "favoritos", label: "Favoritos", icon: "🤍" },
            { key: "nuevos", label: "Nuevos", icon: "✨" },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all transform hover:scale-105 ${
                activeFilter === filter.key
                  ? "bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg shadow-blue-200"
                  : "bg-white text-sky-600 hover:bg-sky-50 shadow-md"
              }`}
            >
              <span className="text-base">{filter.icon}</span>
              <span className="ml-2">{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStories.map((story, index) => (
              <StoryCard
                key={`kids-story-${story.id}-${index}`}
                guide={story}
                variant="kids"
                onPlay={() => handlePlayStory(story.id)}
                isFavorite={favorites.has(story.id)}
                onToggleFavorite={() => handleToggleFavorite(story.id)}
              />
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto px-6 py-12 text-center">
            <div className="bg-white rounded-3xl p-12 shadow-lg">
              {savedGuides.length === 0 ? (
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
        )}
      </div>
    </main>
  );
}
