import { GuideWithCharacter } from "@/types/ai";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export function useSavedGuides() {
  const [savedGuides, setSavedGuides] = useState<GuideWithCharacter[]>([]);
  const [createdAtById, setCreatedAtById] = useState<Record<string, string>>(
    {}
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useAuthStore((state) => state.user);
  const authHeaders = user?.accessToken
    ? { Authorization: `Bearer ${user.accessToken}` }
    : {};
  const normalizeGuide = (guide: GuideWithCharacter): GuideWithCharacter => {
    const emotionId = guide.emotionId;
    const characterId =
      guide.characterId ||
      // @ts-expect-error legacy guides might have a "character" field
      guide.character ||
      // @ts-expect-error fallback for older data
      guide.guideId;

    return {
      ...guide,
      emotionId: emotionId,
      characterId: characterId ?? guide.characterId,
    };
  };

  useEffect(() => {
    const load = async () => {
      if (!user?.id) {
        setSavedGuides([]);
        setIsLoaded(true);
        return;
      }

      try {
        const res = await fetch(`/api/saved-guides`, {
          headers: authHeaders,
        });
        if (!res.ok) {
          throw new Error("Error loading saved guides");
        }
        const data = await res.json();
        const items = (data.items || []) as {
          guide: GuideWithCharacter;
          createdAt: string | null;
        }[];
        setSavedGuides(items.map((item) => normalizeGuide(item.guide)));
        setCreatedAtById(
          items.reduce<Record<string, string>>((acc, item) => {
            if (item.createdAt) {
              acc[item.guide.id] = item.createdAt;
            }
            return acc;
          }, {})
        );
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
    const normalizedGuide = normalizeGuide(guide);
    const res = await fetch("/api/saved-guides", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders },
      body: JSON.stringify({ guide: normalizedGuide }),
    });

    if (!res.ok) {
      throw new Error("Error saving guide");
    }

    const data = await res.json();
    setSavedGuides((prev) => {
      const next = prev.filter((g) => g.id !== normalizedGuide.id);
      return [normalizeGuide(data.guide as GuideWithCharacter), ...next];
    });
    if (data.createdAt) {
      setCreatedAtById((prev) => ({
        ...prev,
        [normalizedGuide.id]: data.createdAt as string,
      }));
    }
    return normalizedGuide.id;
  };

  const deleteGuide = async (id: string) => {
    if (!user?.id) {
      throw new Error("User not authenticated");
    }
    const res = await fetch("/api/saved-guides", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", ...authHeaders },
      body: JSON.stringify({ storyId: id }),
    });

    if (!res.ok) {
      throw new Error("Error deleting guide");
    }

    setSavedGuides((prev) => prev.filter((g) => g.id !== id));
    setCreatedAtById((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const getGuide = (id: string) =>
    savedGuides.find((g) => g.id === id) || null;

  const updateGuideTitle = async (id: string, newTitle: string) => {
    const current = savedGuides.find((g) => g.id === id);
    if (!current) return;
    const updated = { ...current, guideTitle: newTitle };
    await saveGuide(updated);
  };

  return {
    savedGuides,
    createdAtById,
    isLoaded,
    saveGuide,
    deleteGuide,
    getGuide,
    updateGuideTitle,
  };
}
