"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  HiOutlineShare,
  HiOutlinePlay,
  HiOutlineArrowLeft,
  HiOutlinePaperClip,
  HiOutlineCheckCircle,
  HiOutlineClipboardList,
  HiOutlineBeaker,
  HiOutlineHeart,
  HiOutlineClock,
  HiOutlineEmojiHappy,
  HiOutlineCollection,
  HiOutlineMicrophone,
  HiOutlineDownload,
  HiOutlineStar,
  HiOutlineChat,
  HiOutlineLightBulb,
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

import { fichas } from "@/lib/fichas";
import { useRotatingTips } from "@/hooks/useRotationTips";
import { tabs } from "@/lib/fichaTabs";
import UnderlineTabs from "@/components/ui/UnderlineTabs";
import ShareModal from "@/components/ui/ShareModal";

const FichaTutorPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const fichaId = params.id || "explorando-la-ansiedad-tutor";

  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false); // Estado para controlar la visibilidad del modal
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [completedObjectives, setCompletedObjectives] = useState<number[]>([]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [emotionLevel, setEmotionLevel] = useState<number>(3);
  const [notes, setNotes] = useState<string>("");

  const ficha = fichas.find((f) => f.id === fichaId);

  const currentTip = useRotatingTips(ficha?.quickTips || [], 8000);

  const toggleObjective = (index: number): void => {
    setCompletedObjectives((prev: number[]) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleStep = (index: number): void => {
    setCompletedSteps((prev: number[]) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleEmotionLevelChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmotionLevel(Number(e.target.value));
  };

  const handleNotesChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setNotes(e.target.value);
  };

  const progressPercentage = ficha
    ? ((completedObjectives.length + completedSteps.length) /
        (ficha.objectives.length + ficha.preparationSteps.length)) *
      100
    : 0;

  if (!ficha) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white p-8 text-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <HiOutlinePaperClip className="w-16 h-16 text-purple-400 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Ficha no encontrada</h1>
        <p className="text-white/70 mb-6">
          Lo sentimos, no pudimos encontrar la ficha que estás buscando.
        </p>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:brightness-110 transition-all"
        >
          <HiOutlineArrowLeft className="w-5 h-5" />
          Volver a fichas
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
          >
            <HiOutlineArrowLeft className="w-5 h-5 group-hover:text-purple-400 transition-colors" />
            Volver a fichas
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 bg-black/20 border-b border-white/10">
            <div className="flex items-start gap-4 mb-6">
              {ficha.icon}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-medium text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">
                    {ficha.type}
                  </span>
                  <span className="text-sm text-white/60">
                    {ficha.duration}
                  </span>
                  <span className="text-sm text-white/60">
                    {ficha.ageRange}
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-3">{ficha.title}</h1>
                <p className="text-white/80 text-lg leading-relaxed">
                  {ficha.fullDescription}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">
                  Progreso de la sesión
                </span>
                <span className="text-sm text-white/70">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-purple-400 to-blue-400 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {ficha.quickTips && ficha.quickTips.length > 0 && (
              <motion.div
                key={currentTip}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4"
              >
                <div className="flex items-center gap-2">
                  <HiOutlineLightBulb className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span className="text-sm text-yellow-100">{currentTip}</span>
                </div>
              </motion.div>
            )}
          </div>

          <UnderlineTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            className="flex-none"
          />

          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <HiOutlineClock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <div className="text-sm text-white/70">Duración</div>
                      <div className="font-semibold">{ficha.duration}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <HiOutlineEmojiHappy className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <div className="text-sm text-white/70">Edad</div>
                      <div className="font-semibold">{ficha.ageRange}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <HiOutlineStar className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <div className="text-sm text-white/70">Dificultad</div>
                      <div className="font-semibold">{ficha.difficulty}</div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <HiOutlineHeart className="w-5 h-5 text-red-400" />
                      Estado Emocional del Niño
                    </h3>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">😟</span>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={emotionLevel}
                        onChange={handleEmotionLevelChange}
                        className="flex-1"
                      />
                      <span className="text-sm">😊</span>
                      <span className="text-sm font-medium ml-2">
                        {emotionLevel}/5
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "objectives" && (
                <motion.div
                  key="objectives"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <HiOutlineCheckCircle className="w-6 h-6 text-green-400" />
                    Objetivos de Aprendizaje
                  </h2>
                  <div className="space-y-3">
                    {ficha.objectives.map((obj, index) => (
                      <motion.div
                        key={index}
                        className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                          completedObjectives.includes(index)
                            ? "bg-green-500/20 border-green-500/50"
                            : "bg-white/5 border-white/20 hover:border-white/40"
                        }`}
                        onClick={() => toggleObjective(index)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              completedObjectives.includes(index)
                                ? "bg-green-500 border-green-500"
                                : "border-white/40"
                            }`}
                          >
                            {completedObjectives.includes(index) && (
                              <HiOutlineCheckCircle className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span
                            className={
                              completedObjectives.includes(index)
                                ? "line-through text-white/70"
                                : ""
                            }
                          >
                            {obj}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "preparation" && (
                <motion.div
                  key="preparation"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <HiOutlineBeaker className="w-6 h-6 text-blue-400" />
                      Pasos de Preparación
                    </h2>
                    <div className="space-y-3">
                      {ficha.preparationSteps.map((step, index) => (
                        <motion.div
                          key={index}
                          className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                            completedSteps.includes(index)
                              ? "bg-blue-500/20 border-blue-500/50"
                              : "bg-white/5 border-white/20 hover:border-white/40"
                          }`}
                          onClick={() => toggleStep(index)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                                completedSteps.includes(index)
                                  ? "bg-blue-500 border-blue-500 text-white"
                                  : "border-white/40 text-white/70"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <span
                              className={
                                completedSteps.includes(index)
                                  ? "line-through text-white/70"
                                  : ""
                              }
                            >
                              {step}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <HiOutlineClipboardList className="w-5 h-5 text-purple-400" />
                      Materiales Sugeridos
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {ficha.materialsNeeded.map((material, index) => (
                        <div
                          key={index}
                          className="bg-white/5 rounded-lg p-3 flex items-center gap-3"
                        >
                          <HiOutlineDownload className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-sm">{material}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "guidance" && (
                <motion.div
                  key="guidance"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <HiOutlineChat className="w-6 h-6 text-yellow-400" />
                    Consejos para la Sesión
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ficha.guidanceTips.map((tip, index) => (
                      <motion.div
                        key={index}
                        className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="flex items-start gap-3">
                          <HiOutlineLightBulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed">{tip}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "tools" && (
                <motion.div
                  key="tools"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <HiOutlineCollection className="w-6 h-6 text-purple-400" />
                    Herramientas de Sesión
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <HiOutlineMicrophone className="w-5 h-5 text-green-400" />
                        Frases Útiles
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="bg-green-500/20 rounded p-2">
                          {"Veo que te sientes..."}
                        </div>
                        <div className="bg-green-500/20 rounded p-2">
                          {"Eso suena difícil..."}
                        </div>
                        <div className="bg-green-500/20 rounded p-2">
                          {"¿Qué crees que podríamos hacer?"}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4">
                      <h3 className="font-semibold mb-3">Notas de Sesión</h3>
                      <textarea
                        value={notes}
                        onChange={handleNotesChange}
                        placeholder="Escribe observaciones sobre la sesión..."
                        className="w-full h-32 bg-white/10 border border-white/20 rounded-lg p-3 text-sm placeholder-white/50 resize-none focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-6 bg-black/20 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Actividad para Exploradores:
              </h3>
              <span className="text-sm text-white/60">
                {ficha.childContentPreview}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href={ficha.childContentLink} className="block w-full">
                <motion.button
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <HiOutlinePlay className="w-5 h-5" />
                  Iniciar Actividad
                </motion.button>
              </Link>

              {/* Botón Compartir que abre el modal */}
              <motion.button
                onClick={() => setIsShareModalOpen(true)} // Cambia el estado para abrir el modal
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white/10 border border-white/20 text-white font-medium rounded-lg transition-all"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "var(--surface-glass-medium)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <HiOutlineShare className="w-5 h-5" />
                Compartir
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        activityTitle={ficha.title}
        activityId={ficha.id}
        // childrenProfiles={/* Puedes pasar tus perfiles de niños aquí si los tienes, si no, usará el mock interno */}
      />
    </div>
  );
};

export default FichaTutorPage;
