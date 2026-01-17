// components/AmbientBackground.tsx
import { ReactNode } from "react";
import { motion } from "framer-motion";

const AmbientBackground = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative min-h-screen mi-ambient-bg text-white overflow-hidden">
      {/* Partículas mágicas (puedes cambiar a estrellas, niebla, etc.) */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-[url('/textures/stars.svg')] opacity-10 bg-cover"
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AmbientBackground;
