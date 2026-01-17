import React from "react";
import Link from "next/link";

// Placeholder data for recent Bitácora entries for a child
const childBitacoraEntries = [
  {
    date: "Lun",
    color: "var(--color-mood-neutral)",
    symbol: "😌",
    journeyId: "viaje-puma",
  },
  {
    date: "Mar",
    color: "var(--color-mood-content)",
    symbol: "💛",
    journeyId: "viaje-kuntur",
  },
  {
    date: "Mié",
    color: "var(--color-mood-angry)",
    symbol: "😠",
    journeyId: "viaje-amaru",
  },
  {
    date: "Jue",
    color: "var(--color-mood-calm)",
    symbol: "💧",
    journeyId: null,
  },
  {
    date: "Hoy",
    color: "var(--color-mood-night)",
    symbol: "🌙",
    journeyId: "viaje-tortuga",
  },
];

const MoodTracker = () => {
  return (
    <div className="p-6 space-y-6 bg-white/70 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-condor">Mi Bitácora Emocional</h3>
        <Link
          href="/nino/bitacora/historial"
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          Ver historial
        </Link>
      </div>

      {childBitacoraEntries.length > 0 ? (
        <div className="flex gap-4 justify-center">
          {childBitacoraEntries.map((entry, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div
                className="w-10 h-10 rounded-full mb-1 flex items-center justify-center text-xl"
                style={{ backgroundColor: entry.color }}
              >
                {entry.symbol}
              </div>
              <span className="text-condor text-sm font-medium">
                {entry.date}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-condor/60 italic text-center">
          Aún no tienes registros en tu Bitácora. ¡Completa un Viaje para
          empezar!
        </p>
      )}

      {/* Optional: Button to add a new entry */}
      {/* <div className="text-center mt-4">
          <Link href="/nino/bitacora/nueva" className="inline-block bg-yellow-400 text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-300 transition">
             ¿Cómo me siento hoy?
          </Link>
       </div> */}
    </div>
  );
};

export default MoodTracker;
