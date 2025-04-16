"use client";

import JourneyCard from "./JourneyCard";

// Simulador temporal de datos
const journeys = [
  {
    id: "1",
    title: "Voz del Jaguar",
    description: "Despierta tu coraje interior",
    image: "/guides/yachay-transparent.png",
  },
  {
    id: "2",
    title: "Vuelo del Kuntur",
    description: "Mira tu vida desde lo alto",
    image: "/guides/kuntur-transparent.png",
  },
  {
    id: "3",
    title: "Descanso con Hatun",
    description: "Duerme profundo y suelta el día",
    image: "/guides/hatun-transparent.png",
  },
];

const JourneyMapGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {journeys.map((journey) => (
        <JourneyCard key={journey.id} {...journey} />
      ))}
    </div>
  );
};

export default JourneyMapGrid;
