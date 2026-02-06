"use client";

import { useEffect, useState } from "react";

const Forest = () => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const fetchedProgress = 75; // Simular fetch
      setProgress(fetchedProgress);
      if (fetchedProgress < 30) setStage("semilla");
      else if (fetchedProgress < 70) setStage("brote");
      else setStage("expansión");
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="my-12">
      <h3 className="mi-text-subtitle mb-2 text-white">Tu bosque interior</h3>
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-4 bg-white/10 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-white/5 rounded-full"></div>
        </div>
      ) : (
        <>
          <p className="mi-text-body-sm text-white/60 mb-4">
            Crece contigo en cada meditación. Hoy estás en 🌿 etapa de {stage}.
          </p>
          <div className="relative bg-white/5 h-4 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-4 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default Forest;
