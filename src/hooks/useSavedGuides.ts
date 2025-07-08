import { GuideWithCharacter } from "@/types/ai";
import { useEffect, useState } from "react";

const STORAGE_KEY = "mundo-interior-saved-guides";

export function useSavedGuides() {
  const [savedGuides, setSavedGuides] = useState<GuideWithCharacter[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const guides = JSON.parse(stored) as GuideWithCharacter[];
        setSavedGuides(guides);
      }
    } catch (error) {
      console.error("Error loading saved guides:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedGuides));
      } catch (error) {
        console.error("Error saving guides:", error);
      }
    }
  }, [savedGuides, isLoaded]);

  const saveGuide = (guide: GuideWithCharacter) => {
    setSavedGuides((prev) => [guide, ...prev]);
    return guide.id;
  };

  const deleteGuide = (id: string) => {
    setSavedGuides((prev) => prev.filter((g) => g.id !== id));
  };

  const getGuide = (id: string) => savedGuides.find((g) => g.id === id) || null;

  const updateGuideTitle = (id: string, newTitle: string) => {
    setSavedGuides((prev) =>
      prev.map((g) => (g.id === id ? { ...g, guideTitle: newTitle } : g))
    );
  };

  return {
    savedGuides,
    isLoaded,
    saveGuide,
    deleteGuide,
    getGuide,
    updateGuideTitle,
  };
}
