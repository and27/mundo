"use client";

import Link from "next/link";

const moods = [
  { date: "Lun", emoji: "😌" },
  { date: "Mar", emoji: "🌀" },
  { date: "Mié", emoji: "💛" },
  { date: "Jue", emoji: "🌙" },
  { date: "Hoy", emoji: "😊" },
];

const MoodTrackerPreview = () => {
  return (
    <section className="my-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Tu clima emocional</h3>
        <Link href="/mood" className="text-sm text-yellow-400 hover:underline">
          Ver historial
        </Link>
      </div>
      <div className="flex gap-4">
        {moods.map((m) => (
          <div
            key={m.date}
            className="bg-white/5 px-3 py-2 rounded-xl text-center text-sm"
          >
            <p>{m.date}</p>
            <p className="text-xl">{m.emoji}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MoodTrackerPreview;
