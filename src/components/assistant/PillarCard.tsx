"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

interface PillarCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  accentColor?: "primary" | "secondary" | "success";
}

export default function PillarCard({
  icon,
  title,
  children,
  isActive,
  onClick,
  accentColor = "primary",
}: PillarCardProps) {
  const colorClasses = {
    primary: "text-primary-300",
    secondary: "text-secondary-300",
    success: "text-accent-success",
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left"
        aria-expanded={isActive}
      >
        <div className="flex items-center gap-4">
          <div className={`text-2xl ${colorClasses[accentColor]}`}>{icon}</div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <FiChevronDown
          className={`text-2xl text-white/50 transition-transform duration-300 ${
            isActive ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 text-slate-300 space-y-4 prose prose-invert prose-p:text-slate-300 prose-li:text-slate-300">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
