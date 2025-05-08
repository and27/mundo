export interface Emotion {
  id: string;
  emoji: string;
  label: string;
}

export const emotionsBeforeJourney: Emotion[] = [
  { id: "anxious", emoji: "😣", label: "Ansioso/a" },
  { id: "sad", emoji: "😔", label: "Triste" },
  { id: "frustrated", emoji: "😡", label: "Frustrado/a" },
  { id: "overwhelmed", emoji: "😵", label: "Abrumado/a" },
  { id: "unsure", emoji: "❓", label: "No sé" },
];

export const emotionsAfterJourney: Emotion[] = [
  { id: "calm", emoji: "😊", label: "Tranquilo/a" },
  { id: "connected", emoji: "✨", label: "Conectado/a" },
  { id: "happy", emoji: "🙂", label: "Feliz" },
  { id: "relaxed", emoji: "😌", label: "Relajado/a" },
  { id: "reflective", emoji: "🤔", label: "Reflexivo/a" },
  { id: "grateful", emoji: "😇", label: "Agradecido/a" },
];
