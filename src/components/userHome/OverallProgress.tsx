"use client";

import { useState, useEffect } from "react";
import { FiAward, FiCircle, FiCheckCircle, FiEdit3 } from "react-icons/fi";

async function fetchUserOverallProgress(_userId: string) {
  console.log(_userId);
  await new Promise((resolve) => setTimeout(resolve, 700));
  return {
    journeysCompleted: 3,
    journeysRequired: 5,
    logbookReflectionCompleted: true,
    missionTitle: "Tu Gran Aventura Interior",
    isMissionActive: true,
  };
}

type ProgressIconProps = {
  isComplete: boolean;
  isLogbookTask?: boolean;
  title: string;
};

function ProgressIcon({
  isComplete,
  isLogbookTask = false,
  title,
}: ProgressIconProps) {
  const BaseIcon = isComplete ? FiCheckCircle : FiCircle;
  const iconColor = isComplete
    ? isLogbookTask
      ? "text-emerald-400"
      : "text-yellow-400"
    : "text-white/30";

  if (isLogbookTask && isComplete) {
    return (
      <FiCheckCircle
        className={`w-5 h-5 md:w-6 md:h-6 ${iconColor}`}
        title={title}
      />
    );
  }
  if (isLogbookTask && !isComplete) {
    return (
      <FiEdit3 className={`w-5 h-5 md:w-6 md:h-6 ${iconColor}`} title={title} />
    );
  }

  return (
    <BaseIcon className={`w-5 h-5 md:w-6 md:h-6 ${iconColor}`} title={title} />
  );
}

export default function OverallProgress() {
  const [progressData, setProgressData] = useState<{
    journeysCompleted: number;
    journeysRequired: number;
    logbookReflectionCompleted: boolean;
    missionTitle: string;
    isMissionActive: boolean;
  } | null>(null);

  useEffect(() => {
    const currentUserId = "user123";
    fetchUserOverallProgress(currentUserId).then((data) => {
      if (data.isMissionActive) {
        setProgressData(data);
      } else {
        setProgressData(null);
      }
    });
  }, []);

  if (!progressData) {
    return null;
  }

  const {
    journeysCompleted,
    journeysRequired,
    logbookReflectionCompleted,
    missionTitle,
  } = progressData;
  const journeyIcons = Array.from({ length: journeysRequired }, (_, i) => (
    <ProgressIcon
      key={`journey-progress-${i}`}
      isComplete={i < journeysCompleted}
      title={`Viaje ${i + 1}: ${
        i < journeysCompleted ? "Completado" : "Pendiente"
      }`}
    />
  ));

  const allTasksComplete =
    journeysCompleted >= journeysRequired && logbookReflectionCompleted;

  return (
    <section
      aria-labelledby="overall-progress-heading"
      className="shrink-0 text-white p-5 md:p-6 space-y-2"
    >
      <h3
        id="overall-progress-heading"
        className="text-md md:text-lg font-semibold text-center md:text-left"
      >
        {missionTitle}:
      </h3>
      <div
        className="flex justify-center md:justify-start items-center space-x-1.5 my-2"
        aria-label="Progreso de la misión"
      >
        {journeyIcons}
        <span className="mx-1 text-white/50 text-xl">+</span>
        <ProgressIcon
          isComplete={logbookReflectionCompleted}
          isLogbookTask={true}
          title={`Reflexión en Bitácora: ${
            logbookReflectionCompleted ? "Completada" : "Pendiente"
          }`}
        />
      </div>
      {allTasksComplete ? (
        <p className="text-sm text-yellow-300 font-semibold text-center md:text-left flex items-center justify-center md:justify-start">
          <FiAward className="w-5 h-5 mr-2 inline-block" /> ¡Has revelado la
          recompensa!
        </p>
      ) : (
        <p className="text-sm text-white/70 text-center md:text-left">
          Completa todas las tareas para la gran sorpresa.
        </p>
      )}
    </section>
  );
}
