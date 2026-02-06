"use client";

type Props = {
  phase: "idle" | "inhale" | "hold" | "exhale";
};

const BreathingVisual = ({ phase }: Props) => {
  let scale = 1;
  let color = "var(--color-breath-warm)";
  let glow = "var(--color-breath-glow-warm)";

  switch (phase) {
    case "inhale":
      scale = 1.25;
      color = "var(--color-breath-warm-strong)";
      glow = "var(--color-breath-glow-warm-strong)";
      break;
    case "hold":
      scale = 1.25;
      color = "var(--color-breath-warm-strong)";
      glow = "var(--color-breath-glow-warm-soft)";
      break;
    case "exhale":
      scale = 1;
      color = "var(--color-breath-cool)";
      glow = "var(--color-breath-glow-cool)";
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
