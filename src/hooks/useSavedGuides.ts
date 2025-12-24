import { GuideWithCharacter } from "@/types/ai";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export function useSavedGuides() {
  const [savedGuides, setSavedGuides] = useState<GuideWithCharacter[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const load = async () => {
      if (!user?.id) {
        setSavedGuides([]);
        setIsLoaded(true);
        return;
      }

      try {
        const res = await fetch(`/api/saved-guides?userId=${user.id}`);
        if (!res.ok) {
          throw new Error("Error loading saved guides");
        }
        const data = await res.json();
        setSavedGuides((data.guides || []) as GuideWithCharacter[]);
      } catch (error) {
        console.error("Error loading saved guides:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    load();
  }, [user?.id]);

  const saveGuide = async (guide: GuideWithCharacter) => {
    if (!user?.id) {
      throw new Error("User not authenticated");
    }
    const res = await fetch("/api/saved-guides", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, guide }),
    });

    if (!res.ok) {
      throw new Error("Error saving guide");
    }

    const data = await res.json();
    setSavedGuides((prev) => {
      const next = prev.filter((g) => g.id !== guide.id);
      return [data.guide as GuideWithCharacter, ...next];
    });
    return guide.id;
  };

  const deleteGuide = async (id: string) => {
    if (!user?.id) {
      throw new Error("User not authenticated");
    }
    const res = await fetch("/api/saved-guides", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, storyId: id }),
    });

    if (!res.ok) {
      throw new Error("Error deleting guide");
    }

    setSavedGuides((prev) => prev.filter((g) => g.id !== id));
  };

  const getGuide = (id: string) => savedGuides.find((g) => g.id === id) || null;

  const updateGuideTitle = async (id: string, newTitle: string) => {
    const current = savedGuides.find((g) => g.id === id);
    if (!current) return;
    const updated = { ...current, guideTitle: newTitle };
    await saveGuide(updated);
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
