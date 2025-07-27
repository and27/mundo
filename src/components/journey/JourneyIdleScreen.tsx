import React from "react";
import { FaPlay } from "react-icons/fa";
import Button from "@/components/ui/Button"; // Asumiendo que Button está en ui
import Image from "next/image";

interface JourneyIdleScreenProps {
  title: string;
  description: string;
  onStartJourney: () => void; // La función a llamar al hacer clic en el botón
}

const JourneyIdleScreen: React.FC<JourneyIdleScreenProps> = ({
  title,
  onStartJourney,
}) => {
  return (
    <div className="flex flex-col items-center gap-3 text-center animate-fade-in">
      <Image
        src={"/images/childrenHero.webp"}
        height={200}
        width={300}
        alt="portada"
      />
      <h2 className="text-3xl md:text-4xl font-semibold">{title}</h2>
      {/* <p className="text-base max-w-md mx-auto">{description}</p> */}
      <Button onClick={onStartJourney} className="mt-4 shadow-lg">
        <FaPlay className="mr-2" />
        Iniciar Viaje
      </Button>
    </div>
  );
};

export default JourneyIdleScreen;
