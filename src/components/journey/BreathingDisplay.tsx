import React from "react";

interface BreathingDisplayProps {
  type?: "concentric_circles" | "other_style";
}

const BreathingDisplay: React.FC<
  BreathingDisplayProps
> = (/* { type = 'concentric_circles' } */) => {
  return (
    <div
      className="flex justify-center items-center p-8"
      aria-label="Visualización de respiración"
    >
      <div className="relative w-32 h-32 flex justify-center items-center">
        <div
          className="absolute w-full h-full rounded-full bg-cyan-500 opacity-50 animate-breathe-outer"
          // style={{ animationDuration: '7s' }} // Opcional: ajusta duración si la clase no la especifica
        ></div>

        <div
          className="absolute w-3/4 h-3/4 rounded-full bg-cyan-300 opacity-70 animate-breathe-inner"
          // style={{ animationDuration: '7s' }} // Opcional: ajusta duración
        ></div>
      </div>
    </div>
  );
};

export default BreathingDisplay;
