"use client";

import NavigationCard from "./NavigationCard";

const navigationItems = [
  {
    id: "breathing",
    iconSrc: "/guides/amaru-transparent.png",
    altText: "Icono de ejercicio de respiración",
    label: "Respirar y sentir",
    currentProgress: 3,
    totalProgress: 5,
    href: "/child/breathing",
  },
  {
    id: "journeys",
    iconSrc: "/guides/hatun-transparent.png",
    altText: "Icono de viajes guiados",
    label: "Mis aventuras",
    currentProgress: 2,
    totalProgress: 5,
    href: "/child/journeys",
  },
  {
    id: "stories",
    iconSrc: "/guides/kuntur-transparent.png",
    altText: "Icono de cuentos",
    label: "Historias mágicas",
    currentProgress: 1,
    totalProgress: 4,
    href: "/child/stories",
  },
  {
    id: "logbook",
    iconSrc: "/guides/yachay-transparent.png",
    altText: "Icono de bitácora o diario",
    label: "Mis tesoros",
    href: "/child/logbook",
  },
];

export default function CoreNavigation() {
  return (
    <nav
      aria-labelledby="core-navigation-heading"
      className="grid md:grid-cols-2  gap-4 md:gap-6 lg:gap-8 my-10 md:my-12 w-full" // Responsive grid, adjust max-w as needed
    >
      <h2 id="core-navigation-heading" className="sr-only">
        Navegación Principal
      </h2>
      {navigationItems.map((item, idx) => (
        <NavigationCard
          key={item.id}
          iconSrc={item.iconSrc}
          altText={item.altText}
          label={item.label}
          currentProgress={item.currentProgress}
          totalProgress={item.totalProgress}
          href={item.href}
          position={idx === 1 || idx === 3 ? "right" : "left"}
        />
      ))}
    </nav>
  );
}
