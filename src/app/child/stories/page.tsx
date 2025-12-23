"use client";

import { KidsFeaturedCard } from "@/components/kids/KidsFeaturedCard";
import { KidsFilters } from "@/components/kids/KidsFilters";
import { KidsHeader } from "@/components/kids/KidsHeader";
import { KidsStoriesSection } from "@/components/kids/KidsStoriesSection";
import { useKidsStoryFilters } from "@/hooks/useKidsStoryFilters";
import { useSavedGuides } from "@/hooks/useSavedGuides";
import { useRouter } from "next/navigation";

export default function ChildStoriesPage() {
  const { savedGuides, isLoaded } = useSavedGuides();
  const router = useRouter();

  const {
    activeFilter,
    setActiveFilter,
    favorites,
    toggleFavorite,
    filteredStories,
  } = useKidsStoryFilters(savedGuides);

  // if (!isLoaded) return <KidsLoading />;

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600/90 via-purple-700/90">
      <KidsHeader />
      <KidsFeaturedCard
        title="Aventura del Miedo"
        subtitle="Paso 2 de 4"
        imageUrl="/images/all.webp"
        onContinue={() => router.push("/cuentos/miedo-paso-2")}
      />

      <div className="max-w-6xl mx-auto">
        <KidsFilters active={activeFilter} onChange={setActiveFilter} />
      </div>
      <KidsStoriesSection
        stories={filteredStories}
        allStories={savedGuides}
        favorites={favorites}
        onPlay={(id) => router.push(`/cuentos/${id}`)}
        onToggleFavorite={toggleFavorite}
      />
      <div className="mi-surface-soft">
        <KidsStoriesSection
          stories={filteredStories}
          allStories={savedGuides}
          favorites={favorites}
          onPlay={(id) => router.push(`/cuentos/${id}`)}
          onToggleFavorite={toggleFavorite}
        />
      </div>
    </main>
  );
}
