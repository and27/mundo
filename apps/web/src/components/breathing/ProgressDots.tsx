"use client";

type Props = {
  total: number;
  completed: number;
};

const ProgressDots = ({ total, completed }: Props) => {
  return (
    <div className="flex justify-center gap-2 my-4">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full transition-colors duration-300 ${
            i <= completed ? "bg-yellow-400" : "bg-white/80"
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressDots;
