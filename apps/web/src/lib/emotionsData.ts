export interface Emotion {
  id: string;
  emoji: string;
  label: string;
}

export const emotionsBeforeJourney: Emotion[] = [
  { id: "happy", emoji: "🙂", label: "Feliz" },
  { id: "sad", emoji: "😔", label: "Triste" },
  { id: "worried", emoji: "😟", label: "Preocupado/a" },
  { id: "frustrated", emoji: "😡", label: "Frustrado/a" },
  { id: "curious", emoji: "🤔", label: "Curioso/a" },
  { id: "unsure", emoji: "❓", label: "No sé cómo me siento" },
];

export const emotionsAfterJourney_6_8: Emotion[] = [
  { id: "happy", emoji: "🙂", label: "Feliz" },
  { id: "sad", emoji: "😔", label: "Triste" },
  { id: "calm", emoji: "😌", label: "Calmado/a" },
  { id: "sleepy", emoji: "😴", label: "Con sueño" },
];

export const emotionsAfterJourney_9_11: Emotion[] = [
  { id: "relaxed", emoji: "😌", label: "Relajado/a" },
  { id: "content", emoji: "😊", label: "Contento/a" },
  { id: "peaceful", emoji: "🧘", label: "En paz" },
  { id: "bored", emoji: "😒", label: "Aburrido/a" },
  { id: "connected", emoji: "✨", label: "Conectado/a" },
];

export const emotionsAfterJourney_12_15: Emotion[] = [
  { id: "optimistic", emoji: "👍", label: "Optimista" },
  { id: "satisfied", emoji: "😊", label: "Satisfecho/a" },
  { id: "calm_older", emoji: "😌", label: "Tranquilo/a" },
  { id: "discouraged", emoji: "😕", label: "Desanimado/a" },
  { id: "reflective", emoji: "🤔", label: "Reflexivo/a" },
  { id: "grateful", emoji: "😇", label: "Agradecido/a" },
];
