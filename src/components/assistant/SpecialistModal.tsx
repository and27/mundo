import React from "react";
import { X, Shield, Phone, MapPin, Clock, Star } from "lucide-react";
import { MockSpecialist, getSpecialistsByRisk } from "@/lib/mockSpecialists";

export type RiskLevel = "normal" | "attention" | "professional_required";

interface SpecialistModalProps {
  isOpen: boolean;
  onClose: () => void;
  riskLevel: RiskLevel;
  derivationNote?: string;
}

const SpecialistModal: React.FC<SpecialistModalProps> = ({
  isOpen,
  onClose,
  riskLevel,
  derivationNote,
}) => {
  if (!isOpen) return null;

  const specialists =
    riskLevel === "professional_required"
      ? getSpecialistsByRisk("professional_required")
      : riskLevel === "attention"
      ? getSpecialistsByRisk("attention")
      : [];

  const isHighRisk = riskLevel === "professional_required";

  const getSpecialistBgColor = (specialist: MockSpecialist) => {
    return specialist.riskLevel === "professional_required"
      ? "bg-red-50 border-red-200"
      : "bg-blue-50 border-blue-200";
  };

  const getSpecialistTextColor = (specialist: MockSpecialist) => {
    return specialist.riskLevel === "professional_required"
      ? "text-red-900"
      : "text-blue-900";
  };

  const getSpecialistButtonColor = (specialist: MockSpecialist) => {
    return specialist.riskLevel === "professional_required"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-blue-600 hover:bg-blue-700";
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 border-b border-slate-200 rounded-t-xl">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isHighRisk ? "bg-red-100" : "bg-blue-100"
                }`}
              >
                <Shield
                  className={`w-5 h-5 ${
                    isHighRisk ? "text-red-600" : "text-blue-600"
                  }`}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {isHighRisk
                    ? "Atención Profesional Recomendada"
                    : "Especialistas Disponibles"}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Te conectamos con profesionales especializados
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Derivation Note */}
          {derivationNote && (
            <div
              className={`mt-4 p-3 rounded-lg border-l-4 ${
                isHighRisk
                  ? "bg-red-50 border-red-400 text-red-800"
                  : "bg-yellow-50 border-yellow-400 text-yellow-800"
              }`}
            >
              <p className="text-sm">{derivationNote}</p>
            </div>
          )}
        </div>

        {/* Specialists List */}
        <div className="p-6 space-y-4">
          {specialists.map((specialist) => (
            <div
              key={specialist.id}
              className={`p-4 rounded-lg border ${getSpecialistBgColor(
                specialist
              )}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4
                    className={`font-semibold ${getSpecialistTextColor(
                      specialist
                    )}`}
                  >
                    {specialist.name}
                  </h4>
                  <p
                    className={`text-sm opacity-80 ${getSpecialistTextColor(
                      specialist
                    )}`}
                  >
                    {specialist.title}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-slate-600">
                    4.8
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Shield className="w-4 h-4" />
                  <span>{specialist.specialty}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span>{specialist.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span>{specialist.availability}</span>
                </div>
              </div>

              <button
                className={`w-full text-white px-4 py-2 rounded-lg font-medium transition-colors ${getSpecialistButtonColor(
                  specialist
                )}`}
                onClick={() => {
                  // TODO: Implementar navegación al perfil del especialista
                  console.log("Contactar especialista:", specialist.id);
                }}
              >
                {specialist.contact}
              </button>
            </div>
          ))}

          {/* Emergency Note for High Risk */}
          {isHighRisk && (
            <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-900 mb-1">
                    ¿Necesitas ayuda inmediata?
                  </h4>
                  <p className="text-sm text-orange-800 mb-2">
                    Si la situación requiere atención urgente:
                  </p>
                  <div className="text-sm text-orange-800">
                    <p>
                      • <strong>Línea 911:</strong> Emergencias
                    </p>
                    <p>
                      • <strong>Línea 171:</strong> Violencia intrafamiliar
                    </p>
                    <p>
                      • <strong>DINAPEN:</strong> 1800-335-463
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 p-4 border-t border-slate-200 rounded-b-xl">
          <div className="flex gap-3">
            <button
              onClick={() => {
                // TODO: Implementar navegación a directorio completo
                console.log("Ver más especialistas");
              }}
              className="flex-1 bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors font-medium"
            >
              Ver más especialistas
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 text-slate-600 hover:text-slate-800 transition-colors font-medium"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialistModal;
