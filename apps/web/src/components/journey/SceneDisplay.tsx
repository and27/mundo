import Image from "next/image";
import React from "react";

interface SceneDisplayProps {
  text?: string;
  foregroundImage?: string; // URL de la imagen a mostrar (ej: guía)
}

const SceneDisplay: React.FC<SceneDisplayProps> = ({
  text,
  foregroundImage,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4">
      {foregroundImage && (
        <Image
          src={foregroundImage}
          alt=""
          className="object-contain"
          width={300}
          height={300}
        />
      )}
      {text && <p className="text-lg md:text-xl">{text}</p>}
    </div>
  );
};

export default SceneDisplay;
