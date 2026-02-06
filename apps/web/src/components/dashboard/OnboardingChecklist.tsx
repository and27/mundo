"use client";

import React from "react";
import Link from "next/link";
import { FaCheckCircle, FaRegCircle, FaTimes } from "react-icons/fa";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  link: string;
  isCompleted: boolean;
}

interface OnboardingChecklistProps {
  steps: OnboardingStep[];
  onDismiss: () => void;
}

const OnboardingChecklist: React.FC<OnboardingChecklistProps> = ({
  steps,
  onDismiss,
}) => {
  const completedSteps = steps.filter((step) => step.isCompleted).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className="bg-black/10 p-5 rounded-lg border border-condor/30 shadow-md relative">
      <button
        onClick={onDismiss}
        className="absolute top-4 right-4 text-condor/50 hover:text-white transition"
        aria-label="Ocultar bienvenida"
      >
        <FaTimes />
      </button>

      <div className="mb-4">
        <h2 className="text-xl font-bold text-white mb-2">
          ¡Bienvenido! Completa tus primeros pasos como Guía
        </h2>
        <div className="w-full bg-black/20 rounded-full h-2.5">
          <div
            className="bg-jaguar h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-condor/80 mt-1">
          {completedSteps} de {steps.length} pasos completados
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((step) => (
          <Link href={step.link} key={step.id}>
            <div className="p-4 bg-black/20 rounded-md border-2 border-transparent hover:border-jaguar transition-colors h-full flex flex-col cursor-pointer">
              <div className="flex items-center mb-2">
                {step.isCompleted ? (
                  <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                ) : (
                  <FaRegCircle className="text-condor/50 mr-2 flex-shrink-0" />
                )}
                <h3
                  className={`font-semibold ${
                    step.isCompleted
                      ? "text-white/60 line-through"
                      : "text-white"
                  }`}
                >
                  {step.title}
                </h3>
              </div>
              <p className="text-xs text-condor/80 flex-grow">
                {step.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OnboardingChecklist;
