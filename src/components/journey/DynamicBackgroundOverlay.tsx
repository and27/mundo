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
          key={imageUrl} // Change key on URL change to trigger animation
          className="absolute inset-0 z-0" // Position behind content (ensure parent is relative)
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }} // Smooth fade
        >
          <Image
            src={imageUrl}
            alt="Fondo del viaje" // Consider more descriptive alt text if possible
            fill
            className="object-cover object-left md:object-center" // Cover the area
            priority={false} // Backgrounds are usually not priority loads
            // Add quality prop if needed for optimization
            // quality={75}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DynamicBackgroundOverlay;
