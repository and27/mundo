"use client";

import { useState } from "react";
import GuideCard from "@/components/GuideCard";
import { guides } from "@/lib/guides";
import { Guide } from "@/types/guides";
import Button from "@/components/ui/Button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
import clsx from "clsx";

export default function Onboarding() {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSelectGuide = (guide: Guide) => {
    setSelectedGuide(guide);
    setIsLoading(false);
  };

  const handleNavigationStart = () => {
    if (selectedGuide) {
      setIsLoading(true);
    }
  };

  const ButtonContent = isLoading ? (
    <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
  ) : (
    "Empezar meditación"
  );

  const commonButtonClasses =
    "w-fit self-center mt-4 min-h-[48px] min-w-[180px] flex items-center justify-center";
  const interactiveButtonClasses = "cursor-pointer";
  const disabledButtonClasses = "opacity-50 cursor-not-allowed";

  return (
    <div className="flex flex-col px-2 fade-in items-center">
      <h2 className="text-2xl font-bold mb-6">Elige tu guía</h2>
      <div className="w-full grid sm:grid-cols-2 md:grid-cols-5 gap-8 sm:gap-2 md:gap-3 pb-4">
        {guides.map((g) => (
          <GuideCard
            key={g.id}
            {...g}
            selected={selectedGuide?.id === g.id}
            onSelect={() => handleSelectGuide(g)}
          />
        ))}
      </div>

      {selectedGuide ? (
        <Link href={`/cuentos/${selectedGuide.id}`}>
          <Button
            disabled={isLoading}
            className={clsx(
              commonButtonClasses,
              interactiveButtonClasses,
              isLoading
                ? "opacity-70 pointer-events-none"
                : "hover:bg-yellow-300"
            )}
            onClick={handleNavigationStart}
            aria-disabled={isLoading}
            aria-live="polite"
          >
            {ButtonContent}
          </Button>
        </Link>
      ) : (
        <Button
          disabled={true}
          className={clsx(commonButtonClasses, disabledButtonClasses)}
          aria-disabled={true}
        >
          Empezar meditación
        </Button>
      )}
    </div>
  );
}
