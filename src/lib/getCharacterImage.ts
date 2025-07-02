export function getCharacterImage(guideId: string, emotion: string): string {
  const characterEmotions: Record<string, string[]> = {
    yachay: ["afraid", "angry", "calm", "happy", "sad", "surprised"],
    hatun: ["neutro"],
    amaru: ["neutro"],
    kuntur: ["neutro"],
  };

  const fallbackCharacter = "hatun";
  const fallbackEmotion = "neutro";

  const safeCharacter = characterEmotions[guideId]
    ? guideId
    : fallbackCharacter;
  const emotions = characterEmotions[safeCharacter];

  const safeEmotion = emotions.includes(emotion) ? emotion : fallbackEmotion;

  return `/images/characters/${safeCharacter}/${safeCharacter}_${safeEmotion}.png`;
}
