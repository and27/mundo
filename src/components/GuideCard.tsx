"use client";

import { FC } from "react";
import Image from "next/image";

interface GuideCardProps {
  name: string;
  subtitle: string;
  image: string;
  selected?: boolean;
  onSelect?: () => void;
}

const GuideCard: FC<GuideCardProps> = ({
  name,
  subtitle,
  image,
  selected,
  onSelect,
}) => {
  return (
    <div
      className={`hover:opacity-100 flex flex-col cursor-pointer transition duration-300 hover:scale-[1.04] ${
        selected ? "opacity-100 scale-[1.04] " : "opacity-70"
      }`}
      onClick={onSelect}
    >
      <div className="relative w-full h-[400px] mb-3 overflow-hidden shadow-sm rounded-xl">
        {selected && (
          <div className="absolute inset-0 z-0 rounded-xl bg-yellow-400/20 blur-3xl scale-110" />
        )}

        <Image
          src={image}
          alt={name}
          fill
          className={`relative z-10 border-3 transition duration-400 object-cover rounded-xl ${
            selected ? "border-yellow-500" : "border-transparent"
          }`}
          priority
        />
      </div>

      <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white tracking-tight leading-tight">
        {name}
      </h3>

      <p className="tex-sm text-neutral-600 dark:text-white/50 mt-1 leading-snug">
        {subtitle}
      </p>
    </div>
  );
};

export default GuideCard;
