"use client";
import React from "react";
import { motion } from "framer-motion";
import DynamicBackgroundOverlay from "./DynamicBackgroundOverlay";
import Image from "next/image";

type SceneWithCharacterProps = {
  backgroundUrl: string;
  characterUrl: string;
  position?: "left" | "right" | "center";
};

const SceneWithCharacter: React.FC<SceneWithCharacterProps> = ({
  backgroundUrl,
  characterUrl,
  position = "center",
}) => {
  const positionClass =
    position === "left"
      ? "left-6 sm:left-10"
      : position === "right"
      ? "right-6 sm:right-10"
      : "left-1/2 -translate-x-1/2";

  return (
    <div className="relative w-full h-[90vh] overflow-hidden rounded-3xl shadow-xl">
      <DynamicBackgroundOverlay imageUrl={backgroundUrl} />

      <motion.div
        className={`absolute -bottom-20 z-10 ${positionClass}`}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Image
          src={characterUrl}
          alt="Character"
          className="w-[320px] sm:w-[400px] md:w-[480px] drop-shadow-[0_15px_25px_rgba(0,0,0,0.4)]"
        />
      </motion.div>
    </div>
  );
};

export default SceneWithCharacter;
