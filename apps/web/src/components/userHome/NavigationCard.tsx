"use client";

import Image from "next/image";
import Link from "next/link";

type NavigationCardProps = {
  iconSrc: string;
  altText: string;
  label: string; // User-facing label, e.g., "RESPIRAR Y SENTIR"
  currentProgress?: number;
  totalProgress?: number;
  href: string;
  hasNotification?: boolean;
  position?: "left" | "right";
};

export default function NavigationCard({
  iconSrc,
  altText,
  label,
  // currentProgress,
  // totalProgress,
  href,
  hasNotification,
  position,
}: NavigationCardProps) {
  const cardBaseStyle =
    "overflow-hidden  shadow-lg h-[180px] flex gap-5 items-start  rounded-2xl hover:bg-white/25 transition-all transform hover:scale-105 text-white relative";

  return (
    <Link href={href} className={`${cardBaseStyle}`}>
      <Image
        src={iconSrc}
        alt={altText}
        width={100}
        height={100}
        className={`z-8 absolute w-full ${
          position === "left" ? "-ml-20" : "ml-25"
        } mt-3`}
      />
      <div className="z-9 bg-gradient-to-t from-black/20 via-transparent  to-black/20 absolute inset-0" />
      <span
        className={`z-10 font-bold text-3xl pt-5 px-10 ${
          position === "right" ? "text-start mr-30" : "text-end ml-30 "
        }`}
      >
        {label}
      </span>
      {
        //   typeof currentProgress === "number" &&
        //     typeof totalProgress === "number" &&
        //     totalProgress > 0 && (
        //       <span className="text-white/80">
        //         {"🌟 ".repeat(currentProgress)}
        //         {"☆ ".repeat(totalProgress - currentProgress)}
        //         {/* Or: 🌟 {currentProgress}/{totalProgress} */}
        //       </span>
        //     )
      }
      {hasNotification && (
        <span
          aria-label="Nueva notificación"
          className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rounded-full ring-2 ring-white/20"
        ></span>
      )}
    </Link>
  );
}
