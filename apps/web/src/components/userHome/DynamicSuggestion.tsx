"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../ui/Button";

async function fetchPersonalizedSuggestion(_userId: string) {
  console.log(_userId);
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    greeting: "¿Quieres explorar un nuevo sendero hoy?",
    text: "Kuntur me contó que te encantan las alturas. Hoy tengo una historia especial. ¿Quieres escucharla?",
    ctaText: "¡Sí, vamos con Kuntur!",
    ctaLink: "/child/journeys/kuntur-claridad",
    guideImage: "/guides/kuntur-transparent.png",
    guideAlt: "Guía Kuntur",
  };
}

export default function DynamicSuggestion() {
  const router = useRouter();
  const [suggestion, setSuggestion] = useState<{
    greeting: string;
    text: string;
    ctaText: string;
    ctaLink: string;
    guideImage: string | null;
    guideAlt: string;
  } | null>(null);

  useEffect(() => {
    const currentUserId = "user123";
    fetchPersonalizedSuggestion(currentUserId).then((data) => {
      setSuggestion(data);
    });
  }, []);

  const handleCtaClick = () => {
    if (suggestion?.ctaLink) {
      router.push(suggestion.ctaLink);
    }
  };

  if (!suggestion) {
    return null;
  }

  return (
    <section
      aria-labelledby="suggestion-heading"
      className="w-full md:flex-1 text-condor bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-5 md:p-6 space-y-4 flex flex-col items-center md:items-start"
    >
      <h2 id="suggestion-heading" className="sr-only">
        Sugerencia Personalizada
      </h2>
      <div className="flex gap-3">
        {suggestion.guideImage && (
          <div className="flex items-center justify-center w-[100px] h-[100px] shrink-0 bg-white/10 border border-white/20 ratio-1/1 relative rounded-full">
            <Image
              src={suggestion.guideImage}
              alt={suggestion.guideAlt}
              width={120}
              height={120}
              className="object-contain rounded-full object-contain shadow-md"
            />
          </div>
        )}

        <p className="leading-relaxed text-lg md:text-xl font-semibold text-center md:text-left">
          {suggestion.text}
        </p>
      </div>
      <div className="w-full flex flex-col sm:flex-row gap-3 pt-2">
        <Button onClick={handleCtaClick} className="flex-grow">
          {suggestion.ctaText}
        </Button>
      </div>
    </section>
  );
}
