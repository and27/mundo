import { GuideWithCharacter } from "@/types/ai";
import { useMemo, useState } from "react";

export function useKidsStoryFilters(stories: GuideWithCharacter[]) {
  const [activeFilter, setActiveFilter] = useState<
    "todos" | "favoritos" | "nuevos"
  >("todos");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filteredStories = useMemo(() => {
    if (activeFilter === "favoritos") {
      return stories.filter((s) => favorites.has(s.id));
    }
    if (activeFilter === "nuevos") {
      return [];
    }
    return stories;
  }, [stories, activeFilter, favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return {
    activeFilter,
    setActiveFilter,
    favorites,
    toggleFavorite,
    filteredStories,
  };
}
