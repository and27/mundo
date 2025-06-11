import { useState } from "react";

export function useGuideInteraction() {
  const [activePillar, setActivePillar] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [rating, setRating] = useState(0);

  const handlePillarChange = (index: number) => setActivePillar(index);
  const toggleBookmark = () => setIsBookmarked((prev) => !prev);
  const handleRatingChange = (newRating: number) => setRating(newRating);

  return {
    activePillar,
    isBookmarked,
    rating,
    handlePillarChange,
    toggleBookmark,
    handleRatingChange,
  };
}
