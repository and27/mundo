"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface DynamicBackgroundOverlayProps {
  imageUrl: string | null;
}

const DynamicBackgroundOverlay: React.FC<DynamicBackgroundOverlayProps> = ({
  imageUrl,
}) => {
  const [currentImage, setCurrentImage] = useState<string | null>(imageUrl);
  useEffect(() => {
    if (imageUrl && imageUrl !== currentImage) {
      // Precargar imagen antes de cambiar
      const img = new window.Image();
      img.src = imageUrl;
      img.onload = () => {
        setCurrentImage(imageUrl);
      };
    }
  }, [imageUrl, currentImage]);

  return (
    <AnimatePresence mode="wait">
      {currentImage && (
        <motion.div
          key={currentImage}
          className="absolute inset-0 z-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Contenedor con escala extra para evitar bordes */}
          <div className="absolute inset-0 scale-110">
            <motion.div
              className="absolute inset-0"
              animate={{
                x: ["0%", "-4%", "0%", "4%", "0%"],
                y: ["0%", "-2%", "0%", "2%", "0%"],
                scale: [1, 1.05, 1.02, 1.05, 1],
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
            >
              <div className="absolute inset-0 scale-[1.05] blur-[6px]">
                <Image
                  src={currentImage}
                  alt="Fondo del viaje"
                  fill
                  className="object-cover"
                  priority
                  quality={95}
                  sizes="120vw"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DynamicBackgroundOverlay;
