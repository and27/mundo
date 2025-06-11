import React from "react";
import { AlertTriangle, Phone } from "lucide-react";
import { RiskAssessment } from "@/types/ai";

interface RiskAlertBannerProps {
  riskAssessment: RiskAssessment;
  onConnectSpecialist: () => void;
}

export const RiskAlertBanner: React.FC<RiskAlertBannerProps> = ({
  riskAssessment,
  onConnectSpecialist,
}) => {
  const isHighRisk = riskAssessment.riskLevel === "professional_required";

  return (
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
            {riskAssessment.derivationNote ||
              "Esta situación podría beneficiarse de orientación profesional."}
          </p>

          {/* CTA integrado */}
          <button
            onClick={onConnectSpecialist}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
              isHighRisk
                ? "bg-red-600 hover:bg-red-700 text-white shadow-lg"
                : "bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg"
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Conectar con especialista ahora</span>
          </button>
        </div>
      </div>
    </div>
  );
};
