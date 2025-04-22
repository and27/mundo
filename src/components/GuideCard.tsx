"use client";

import { FC } from "react";
import Image from "next/image";

interface GuideCardProps {
  id: string; // Add ID for key and potentially parent logic
  name: string;
  subtitle: string;
  image: string;
  selected: boolean; // Boolean directly indicates selection
  onSelect: (id: string) => void; // Pass back the ID of the selected card
}

const GuideCard: FC<GuideCardProps> = ({
  id,
  name,
  subtitle,
  image,
  selected,
  onSelect,
}) => {
  return (
    <div
      className={`
         flex flex-col cursor-pointer transition duration-300 relative group
        ${
          selected
            ? "opacity-100 scale-[1.04]" // Selected: Fully visible, scaled up
            : "opacity-70 hover:opacity-100 hover:scale-[1.04]" // Unselected: Dim, full opacity/scale on hover
        }
      `}
      onClick={() => onSelect(id)} // Call onSelect with the card's ID
    >
      {selected && (
        <div
          className="absolute z-0 rounded-xl bg-yellow-400/20 blur-2xl sm:blur-3xl opacity-75"
          aria-hidden="true"
        />
      )}

      <div
        className={`relative w-full max-w-100 h-50 sm:h-80 md:h-96  overflow-hidden rounded-lg shadow-lg border-2 transition duration-300 ${
          selected
            ? "border-yellow-400"
            : "border-transparent group-hover:border-white/20"
        }`}
      >
        <Image
          src={image}
          alt={name}
          fill
          className={`object-cover object-top sm:object-center transition-all duration-300 ${
            selected ? "scale-105" : "group-hover:scale-105"
          }`}
          // Consider removing priority if many cards are loading initially
          // priority={selected} // Maybe prioritize only the selected one if needed
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" // Example sizes
        />
      </div>
      <div
        className="max-w-100 rounded-lg absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-t from-black/70 via-black/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="absolute top-0 sm:top-auto sm:bottom-0 left-0 right-0 p-3 md:p-4 z-10 pointer-events-none">
        <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight leading-tight drop-shadow-md">
          {name}
        </h3>
        <p className="text-xs sm:text-sm text-white/80 mt-0.5 leading-snug drop-shadow-md">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default GuideCard;
