"use client";

import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

type Props = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const JourneyCard = ({ id, title, description, image }: Props) => {
  return (
    <Link
      href={`/guide/${id}`}
      className="group relative bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition duration-200 flex flex-col items-center text-center overflow-hidden"
    >
      {/* Imagen del guía */}
      <div className="w-24 h-24 relative mb-4 transition-transform group-hover:scale-105">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain rounded-full shadow-md"
        />
      </div>

      {/* Icono de reproducir tipo Spotify */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition duration-300">
        <div className="bg-yellow-400 text-black p-2 rounded-full shadow hover:scale-110">
          <FaPlay size={14} />
        </div>
      </div>

      {/* Título y descripción */}
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-white/60">{description}</p>
    </Link>
  );
};

export default JourneyCard;
