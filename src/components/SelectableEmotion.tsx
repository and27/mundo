"use client";
import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";
import { FiCheck } from "react-icons/fi";

const emotionsData = [
  { label: "Feliz", emoji: "😊" },
  { label: "Triste", emoji: "😢" },
  { label: "Preocupado/a", emoji: "😰" },
  { label: "Frustrado/a", emoji: "😤" },
  { label: "Curioso/a", emoji: "🤔" },
  { label: "No sé cómo me siento", emoji: "❓" },
];

interface GridProps {
  emotions?: typeof emotionsData;
  initialSelected?: string;
  onSelect?: (label: string) => void;
  mode?: "before" | "after";
  className?: string;
  showFeedback?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 20 },
  },
};

const SelectableEmotionGrid = memo(
  ({
    emotions = emotionsData,
    initialSelected,
    onSelect,
    className = "",
    showFeedback = true,
  }: GridProps) => {
    const [selectedLabel, setSelectedLabel] = useState<string | null>(
      initialSelected || null
    );

    const handleClick = (label: string) => {
      setSelectedLabel(label);
      onSelect?.(label);
    };

    const getGridClasses = () => {
      const count = emotions.length;
      if (count <= 4) return "grid-cols-2 max-w-lg";
      if (count <= 6) return "grid-cols-2 sm:grid-cols-3 max-w-2xl";
      return "grid-cols-2 sm:grid-cols-4 max-w-4xl";
    };

    return (
      <motion.div
        className={`w-full ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className={`grid ${getGridClasses()} p-2 md:p-8 gap-4 sm:gap-6 w-full mx-auto`}
        >
          {emotions.map((emotion) => {
            const isSelected = selectedLabel === emotion.label;
            return (
              <motion.button
                key={emotion.label}
                layout
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleClick(emotion.label)}
                className={`text-black relative rounded-2xl p-6 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-primary-400 min-h-[140px] flex flex-col items-center justify-center text-center ${
                  isSelected
                    ? "glass-strong"
                    : "glass-medium hover:glass-strong/80"
                }`}
              >
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      layoutId="emotion-halo"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-primary rounded-2xl blur-xl opacity-30"
                    />
                  )}
                </AnimatePresence>

                <span className="text-5xl mb-3 relative z-10">
                  {emotion.emoji}
                </span>
                <span className="text-md font-semibold text-foreground relative z-10">
                  {emotion.label}
                </span>

                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 45 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                      className="absolute -top-3 -right-3 w-7 h-7 bg-success-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <FiCheck className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </motion.div>

        <AnimatePresence>
          {selectedLabel && showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 text-center"
            >
              <div className="inline-flex items-center gap-2 bg-success-500/10 rounded-xl px-4 py-2">
                <HiSparkles className="w-5 h-5 text-success-500" />
                <span className="text-foreground/90 font-medium">
                  {"¡Gracias por compartir!"}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

SelectableEmotionGrid.displayName = "SelectableEmotionGrid";

export default SelectableEmotionGrid;
