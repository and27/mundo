import React, { useState } from "react";
import { ChevronDown, Settings, Users, Calendar, MapPin } from "lucide-react";
import { useModeStore } from "@/store/useModeState";

interface ContextPanelProps {
  onContextChange: (context: ContextData) => void;
}

export interface ContextData {
  age?: string;
  grade?: string;
  groupSize?: string;
  location?: string;
  additionalInfo?: string;
}

export default function ContextPanel({ onContextChange }: ContextPanelProps) {
  const [context, setContext] = useState<ContextData>({});
  const { isSchoolMode } = useModeStore();

  const handleInputChange = (field: keyof ContextData, value: string) => {
    const newContext = { ...context, [field]: value };
    setContext(newContext);
    onContextChange(newContext);
  };

  const ageOptions = [
    "3-4 años",
    "5-6 años",
    "7-8 años",
    "9-10 años",
    "11-12 años",
    "13+ años",
  ];

  const gradeOptions = [
    "Pre-kinder",
    "Kinder",
    "1er grado",
    "2do grado",
    "3er grado",
    "4to grado",
    "5to grado",
    "6to grado",
    "7mo grado",
  ];

  const groupSizeOptions = [
    "1-10 estudiantes",
    "11-20 estudiantes",
    "21-30 estudiantes",
    "30+ estudiantes",
  ];

  return (
    <div className="mb-4">
      <div className="mt-2 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4 animate-in slide-in-from-top-2 duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Age/Grade Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {isSchoolMode ? "Grado" : "Edad del niño/a"}
            </label>
            <select
              value={isSchoolMode ? context.grade || "" : context.age || ""}
              onChange={(e) =>
                handleInputChange(
                  isSchoolMode ? "grade" : "age",
                  e.target.value
                )
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="">Seleccionar...</option>
              {(isSchoolMode ? gradeOptions : ageOptions).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Group Size (only for school mode) */}
          {isSchoolMode && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Tamaño del grupo
              </label>
              <select
                value={context.groupSize || ""}
                onChange={(e) => handleInputChange("groupSize", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              >
                <option value="">Seleccionar...</option>
                {groupSizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Location/Environment */}
          <div className={isSchoolMode ? "md:col-span-1" : "md:col-span-2"}>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {isSchoolMode ? "Tipo de institución" : "Contexto familiar"}
            </label>
            <input
              type="text"
              value={context.location || ""}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder={
                isSchoolMode
                  ? "Ej: Escuela pública urbana"
                  : "Ej: Familia monoparental, hermanos mayores"
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
        </div>

        {/* Additional Info */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Información adicional relevante
          </label>
          <textarea
            value={context.additionalInfo || ""}
            onChange={(e) =>
              handleInputChange("additionalInfo", e.target.value)
            }
            placeholder={
              isSchoolMode
                ? "Ej: Época de exámenes, cambio de profesor, situación particular del aula..."
                : "Ej: Cambios recientes en casa, situaciones especiales, otros hermanos..."
            }
            rows={2}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-none"
          />
        </div>

        {/* Context Summary */}
        {(context.age ||
          context.grade ||
          context.groupSize ||
          context.location ||
          context.additionalInfo) && (
          <div className="mt-3 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
            <p className="text-xs text-indigo-700 font-medium mb-1">
              Contexto agregado:
            </p>
            <div className="flex flex-wrap gap-2">
              {(context.age || context.grade) && (
                <span className="inline-flex items-center px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                  {isSchoolMode ? context.grade : context.age}
                </span>
              )}
              {context.groupSize && (
                <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  {context.groupSize}
                </span>
              )}
              {context.location && (
                <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                  {context.location}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
