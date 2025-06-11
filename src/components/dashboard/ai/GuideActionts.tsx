"use client";

import { useState, useEffect } from "react";
import { ActionableGuide } from "@/types/ai";
import { saveGuideToLocal, getSavedGuidesFromLocal } from "@/lib/storage";
import { EmailModal } from "../../assistant/EmailModal";
import { AccountPrompt } from "../../assistant/AccountPrompt";
import SpecialistModal from "../../assistant/SpecialistModal";
import {
  Bookmark,
  CheckCircle2,
  Download,
  Share2,
  Check,
  Mail,
  Phone,
  AlertTriangle,
} from "lucide-react";

interface GuideActionsProps {
  guide: ActionableGuide | null;
}

export default function GuideActions({ guide }: GuideActionsProps) {
  const user = "Andres";
  const [isSaved, setIsSaved] = useState(false);
  const [showAccountPrompt, setShowAccountPrompt] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showSpecialistModal, setShowSpecialistModal] = useState(false);
  const [shareStatus, setShareStatus] = useState<string>("");
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    if (!guide) return;
    const savedGuides = getSavedGuidesFromLocal();
    const alreadySaved = savedGuides.some((g) => g.id === guide.id);
    setIsSaved(alreadySaved);
    setShowAccountPrompt(false);
  }, [guide?.id, guide]);

  if (!guide) return null;

  const shouldShowRiskAlert =
    guide.riskAssessment && guide.riskAssessment.riskLevel !== "normal";
  const isHighRisk =
    guide.riskAssessment?.riskLevel === "professional_required";

  const handleSave = async () => {
    if (user) {
      console.log("Guardando en DB para el usuario:", user);
      setIsSaved(true);
    } else {
      saveGuideToLocal(guide);
      setIsSaved(true);
      setShowAccountPrompt(true);
    }
  };

  const handleDownload = () => window.print();

  const handleEmailSubmit = async (email: string, parentName: string) => {
    try {
      console.log("Enviando guía por email:", {
        email,
        parentName,
        guide: guide.id,
      });

      setShowEmailModal(false);
      setShareStatus("¡Enviado por email exitosamente!");
      setTimeout(() => setShareStatus(""), 3000);
    } catch (error) {
      console.error("Error al enviar email:", error);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    const shareData = {
      title: `Guía de Mundo Interior: ${guide.guideTitle}`,
      text: `Descubrí una guía útil sobre "${guide.guideTitle}" en Mundo Interior.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus("¡Compartido exitosamente!");
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setShareStatus("¡Enlace copiado!");
      }
      setTimeout(() => setShareStatus(""), 3000);
    } catch (error) {
      console.error("Error al compartir:", error);
      setShareStatus("No se pudo compartir");
      setTimeout(() => setShareStatus(""), 3000);
    } finally {
      setIsSharing(false);
    }
  };

  const handleConnectSpecialist = () => {
    setShowSpecialistModal(true);
  };

  return (
    <div className="space-y-6 print-hidden">
      {/* Risk Alert Banner con CTA integrado */}
      {shouldShowRiskAlert && guide.riskAssessment && (
        <div
          className={`p-4 rounded-xl border-l-4 ${
            isHighRisk
              ? "bg-red-50 border-red-400 text-red-800"
              : "bg-yellow-50 border-yellow-400 text-yellow-800"
          }`}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle
              className={`w-5 h-5 mt-0.5 ${
                isHighRisk ? "text-red-600" : "text-yellow-600"
              }`}
            />
            <div className="flex-1">
              <h4 className="font-semibold mb-1">
                {isHighRisk
                  ? "Recomendamos atención profesional"
                  : "Situación que requiere atención"}
              </h4>
              <p className="text-sm mb-3">
                {guide.riskAssessment.derivationNote ||
                  "Esta situación podría beneficiarse de orientación profesional."}
              </p>

              <button
                onClick={handleConnectSpecialist}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg ${
                  isHighRisk
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-yellow-600 hover:bg-yellow-700 text-white"
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>Conectar con especialista ahora</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Action Buttons */}
      <div className="text-center">
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <button
            onClick={() => setShowEmailModal(true)}
            className="group w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full hover:scale-110 transition-all duration-300 flex items-center justify-center"
            title="Enviar por email"
          >
            <Mail className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={handleShare}
            disabled={isSharing}
            className="group w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full hover:scale-110 transition-all duration-300 flex items-center justify-center disabled:opacity-50"
            title="Compartir"
          >
            {isSharing ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin text-white" />
            ) : (
              <Share2 className="w-5 h-5 text-white" />
            )}
          </button>

          <button
            onClick={handleSave}
            disabled={isSaved}
            className={`group w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center ${
              isSaved
                ? "bg-green-100 border border-green-300 cursor-default"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-110"
            }`}
            title={isSaved ? "Guardado" : "Guardar guía"}
          >
            {isSaved ? (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            ) : (
              <Bookmark className="w-5 h-5 text-white" />
            )}
          </button>

          <button
            onClick={handleDownload}
            className="group w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full hover:scale-110 transition-all duration-300 flex items-center justify-center"
            title="Descargar PDF"
          >
            <Download className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Status Messages */}
      {shareStatus && (
        <div className="flex items-center justify-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 animate-in slide-in-from-top-2 duration-300">
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">{shareStatus}</span>
        </div>
      )}

      {/* Modales separados */}
      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSubmit={handleEmailSubmit}
      />

      <AccountPrompt
        isVisible={showAccountPrompt}
        onClose={() => setShowAccountPrompt(false)}
      />

      {showSpecialistModal && guide.riskAssessment && (
        <SpecialistModal
          isOpen={showSpecialistModal}
          onClose={() => setShowSpecialistModal(false)}
          riskLevel={guide.riskAssessment.riskLevel}
          derivationNote={guide.riskAssessment.derivationNote}
        />
      )}
    </div>
  );
}
