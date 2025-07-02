export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatarUrl?: string;
  lastJourney?: string;
  nextSuggestedJourney?: string;
  totalJourneys: number;
  favoritePlatform?: "web" | "tablet" | "phone";
}

export const childrenList: ChildProfile[] = [
  {
    id: "child-1",
    name: "Lucía Martínez",
    age: 8,
    avatarUrl: "/guides/yachay-transparent.png",
    lastJourney: "El Sendero del Puma Valiente",
    nextSuggestedJourney: "El Río de las Emociones con Amaru",
    totalJourneys: 3,
    favoritePlatform: "tablet",
  },
  {
    id: "child-2",
    name: "Mateo González",
    age: 6,
    avatarUrl: "/guides/kuntur-transparent.png",
    lastJourney: "Los Ojos del Cóndor",
    nextSuggestedJourney: "La Calma de Hatun Tortuga",
    totalJourneys: 2,
    favoritePlatform: "web",
  },
  {
    id: "child-3",
    name: "Sofía Rodríguez",
    age: 10,
    avatarUrl: undefined,
    lastJourney: undefined,
    nextSuggestedJourney: "El Sendero del Puma Valiente",
    totalJourneys: 0,
    favoritePlatform: "tablet",
  },
];
