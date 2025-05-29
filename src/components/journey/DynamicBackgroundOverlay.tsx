"use client";

import React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface DynamicBackgroundOverlayProps {
  imageUrl: string | null;
}

const DynamicBackgroundOverlay: React.FC<DynamicBackgroundOverlayProps> = ({
  imageUrl,
}) => {
  return (
    <AnimatePresence>
      {imageUrl && (
        <motion.div
          key={imageUrl} // Change key on URL change to trigger fade animation
          className="absolute inset-0 z-0 overflow-hidden" // Added overflow-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }} // Handles fade-in
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }} // Smooth fade for image change
        >
          <motion.div
            className="absolute inset-0" // This div will hold the image and pan
            animate={{
              // New animation for panning
              x: ["-2%", "2%", "-2%"], // Move slightly left, then right, then back to start-ish
            }}
            transition={{
              x: {
                // Transition specific for x property
                duration: 20, // Duration of one full pan cycle (ida y vuelta) - ajusta esto
                repeat: Infinity, // Repeat indefinitely
                repeatType: "loop", // Loop the animation
                ease: "linear", // Smooth, constant movement - o "easeInOut" para suavizar inicios/finales
              },
            }}
          >
            <Image
              src={imageUrl}
              alt="Fondo del viaje"
              fill
              className="object-cover object-center" // object-center might be better for panning
              // o asegúrate que la imagen sea más ancha que el viewport
              priority={false}
              // quality={75} // Descomenta para optimizar
              // Para que el paneo funcione bien visualmente, la imagen debería
              // ser un poco más ancha que su contenedor, o el movimiento debe ser muy sutil.
              // Si usas 'fill', la imagen ya se estira para llenar.
              // Podríamos necesitar un contenedor interno para la imagen con un 'scale'
              // si la imagen no es suficientemente ancha.
              // Ejemplo para asegurar que la imagen es más ancha:
              // style={{ scale: 1.05 }} // Escala la imagen un 5% más
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DynamicBackgroundOverlay;
