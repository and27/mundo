import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import BreathingVisual from "./BreathingVisual";
import ProgressDots from "./ProgressDots";

const TOTAL_CYCLES = 5;
const DURATIONS = {
  inhale: 3000,
  hold: 1000,
  exhale: 4000,
};

export type BreathingPhase = "idle" | "inhale" | "hold" | "exhale";

export default function BreathingPlayer() {
  const router = useRouter();
  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState<BreathingPhase>("idle");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done || (phase === "idle" && cycle === 0)) {
      setPhase("inhale");
      return;
    }

    let timeout: NodeJS.Timeout;
    if (phase === "inhale") {
      timeout = setTimeout(() => setPhase("hold"), DURATIONS.inhale);
    } else if (phase === "hold") {
      timeout = setTimeout(() => setPhase("exhale"), DURATIONS.hold);
    } else if (phase === "exhale") {
      timeout = setTimeout(() => {
        if (cycle + 1 >= TOTAL_CYCLES) {
          setDone(true);
          setPhase("idle");
        } else {
          setCycle(cycle + 1);
          setPhase("inhale");
        }
      }, DURATIONS.exhale);
    }

    return () => clearTimeout(timeout);
  }, [phase, cycle, done]);

  return (
    <div className="flex flex-col items-center gap-5">
      <BreathingVisual phase={phase} />
      <ProgressDots total={TOTAL_CYCLES} completed={cycle} />
      <p className="text-xl text-white mt-4">
        {phase === "inhale" && "Inhala suave..."}
        {phase === "hold" && "Sostén..."}
        {phase === "exhale" && "Exhala lentamente..."}
        {done && "¡Lo hiciste muy bien!"}
      </p>

      <button
        onClick={() => router.push("/end")}
        disabled={!done}
        className={`text-lg bg-yellow-400 text-black flex items-center gap-2 px-10 py-3 rounded-full border border-white/30 shadow transition ${
          done ? "hover:bg-yellow-400/90" : "opacity-50 cursor-not-allowed"
        }`}
      >
        <FaStar className="text-black" />
        ¡Listo!
      </button>
    </div>
  );
}
