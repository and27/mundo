"use client";

type Props = {
  phase: "idle" | "inhale" | "hold" | "exhale";
};

const BreathingVisual = ({ phase }: Props) => {
  let scale = 1;
  let color = "#FFDA63";
  let glow = "#FFDA6380";

  switch (phase) {
    case "inhale":
      scale = 1.25;
      color = "#FFE082";
      glow = "#FFE08299";
      break;
    case "hold":
      scale = 1.25;
      color = "#FFE082";
      glow = "#FFE08266";
      break;
    case "exhale":
      scale = 1;
      color = "#AED5F5";
      glow = "#AED5F580";
      break;
    default:
      break;
  }

  return (
    <div
      className="rounded-full transition-all duration-3000 ease-in-out shadow-lg"
      style={{
        width: "160px",
        height: "160px",
        transform: `scale(${scale})`,
        backgroundColor: color,
        boxShadow: `0 0 30px 10px ${glow}`,
        opacity: 0.9,
      }}
    ></div>
  );
};

export default BreathingVisual;
