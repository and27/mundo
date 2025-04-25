"use client";

import { useEffect } from "react";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import Link from "next/link";
import Image from "next/image";
import AvatarButton from "@/components/common/AvatarButton";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const emotion = useOnboardingStore((state) => state.emotion);
  const name = useOnboardingStore((state) => state.name);

  useEffect(() => {
    const getTintColorValueForEmotion = (emo: string | null): string => {
      switch (emo) {
        case "Feliz":
          return "color-mix(in srgb, var(--color-gold) 12%, transparent)";
        case "Tranquilo/a":
          return "color-mix(in srgb, var(--color-sky) 5%, transparent)";
        case "Relajado/a":
          return "color-mix(in srgb, var(--color-forest) 12%, transparent)";
        case "Conectado/a":
          return "color-mix(in srgb, var(--color-magic) 15%, transparent)";
        case "Reflexivo/a":
          return "color-mix(in srgb, var(--color-sky) 15%, transparent)";
        case "Triste":
          return "color-mix(in srgb, var(--color-sky) 60%, var(--color-condor) 10%)";
        case "Ansioso/a":
          return "color-mix(in srgb, var(--color-sunset) 8%, transparent)";
        case "Frustrado/a":
          return "color-mix(in srgb, var(--color-sunset) 10%, transparent)";
        case "Abrumado/a":
          return "color-mix(in srgb, var(--color-condor) 15%, transparent)";
        case "No sé":
        default:
          return "transparent";
      }
    };

    const tintColorValue = getTintColorValueForEmotion(emotion);
    document.body.style.setProperty("--emotion-tint-color", tintColorValue);
  }, [emotion]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-black/30 backdrop-blur-xs sticky top-0 z-50">
        <div className="flex justify-between items-center px-5 md:px-10 py-3 md:py-5 max-w-screen-xl mx-auto">
          <Link href="/">
            <Image
              src="/images/logo-mundo.png"
              alt="Mundo Interior Logo"
              width={120}
              height={30}
              priority
            />
          </Link>
          <AvatarButton name={name} />
        </div>
      </div>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
