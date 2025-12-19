"use client";

import { useRouter } from "next/navigation";
import ProgramLessonItem from "./ProgramLessonItem";

const modules = [
  {
    id: "1",
    title: "Enfado y Rabia",
    subtitle: "Aprende a calmar la tormenta interior",
    duration: "8 minutos",
    image: "/images/all.webp",
  },
  {
    id: "2",
    title: "Miedo",
    subtitle: "Cómo enfrentar lo que nos asusta",
    duration: "7 minutos",
    image: "/images/modules/fear.png",
  },
  {
    id: "3",
    title: "Tristeza",
    subtitle: "Entender y acompañar lo que duele",
    duration: "8 minutos",
    image: "/images/modules/sadness.png",
  },
  {
    id: "4",
    title: "Alegría y Optimismo",
    subtitle: "Encontrar luz incluso en días nublados",
    duration: "6 minutos",
    image: "/images/modules/joy.png",
  },
  {
    id: "5",
    title: "Celos y Comparaciones",
    subtitle: "Aprender a valorar lo propio",
    duration: "7 minutos",
    image: "/images/modules/jealousy.png",
  },
  {
    id: "6",
    title: "Vergüenza",
    subtitle: "Construyendo seguridad interior",
    duration: "7 minutos",
    image: "/images/modules/shame.png",
  },
];

export default function ProgramLessonsList() {
  const router = useRouter();

  return (
    <div className="max-w-4xl px-5 md:px-20 mi-stack-lg">
      <header className="mi-section-header">
        <h1 className="text-3xl md:text-4xl tracking-tight font-extrabold text-neutral-800 mi-section-title">
          Emociones en Acción
        </h1>
        <p className="text-neutral-600 max-w-xl leading-relaxed">
          Explora cada emoción a través de cuentos interactivos y reflexiones
          que ayudan a los niños a entender y expresar lo que sienten.
        </p>
      </header>

      <div className="mi-stack-md">
        {modules.map((mod) => (
          <ProgramLessonItem
            key={mod.id}
            module={mod}
            onClick={() =>
              router.push(`/parentDashboard?section=program&lesson=${mod.id}`)
            }
          />
        ))}
      </div>
    </div>
  );
}
