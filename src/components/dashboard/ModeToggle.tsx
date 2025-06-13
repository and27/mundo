import React from "react";
import { Users, User, Settings, ChevronDown } from "lucide-react";
import { useModeStore } from "@/store/useModeState";
import ModeOption from "../ui/ModeOption";
import Dropdown from "../ui/Dropdown";

interface ModeToggleProps {
  variant?: "header" | "sidebar" | "inline";
  className?: string;
}

export default function ModeToggle({
  variant = "header",
  className = "",
}: ModeToggleProps) {
  const { isSchoolMode, setSchoolMode } = useModeStore();

  const handleModeSelect = (schoolMode: boolean) => {
    setSchoolMode(schoolMode);
  };

  // Trigger button styles based on variant
  const getTriggerStyles = () => {
    switch (variant) {
      case "header":
        return "flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-200 hover:shadow-lg backdrop-blur-sm";
      case "sidebar":
        return "flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200";
      default:
        return "flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-gray-50 border border-slate-200 rounded-lg transition-all duration-200 hover:shadow-md";
    }
  };

  const getIconStyles = () => {
    const base = "w-5 h-5 rounded flex items-center justify-center";
    if (variant === "header") {
      return `${base} ${
        isSchoolMode
          ? "bg-green-500/30 text-green-300"
          : "bg-blue-500/30 text-blue-300"
      }`;
    }
    return `${base} ${
      isSchoolMode ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
    }`;
  };

  const getTextColor = () => {
    return variant === "header" ? "text-white" : "text-current";
  };

  const trigger = (
    <button className={`${getTriggerStyles()} ${className}`}>
      <div className={getIconStyles()}>
        {isSchoolMode ? (
          <Users className="w-3 h-3" />
        ) : (
          <User className="w-3 h-3" />
        )}
      </div>
      <span className={`hidden sm:inline ${getTextColor()}`}>
        {isSchoolMode ? "Educador" : "Individual"}
      </span>
      <ChevronDown
        className={`w-4 h-4 ${
          variant === "header" ? "text-white/70" : "text-slate-500"
        } transition-transform`}
      />
    </button>
  );

  const dropdownContent = (
    <div className="w-72 bg-white/95 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-slate-200/50">
        <div className="flex items-center gap-2 text-slate-800">
          <Settings className="w-4 h-4" />
          <span className="font-semibold text-sm">Modo de Uso</span>
        </div>
        <p className="text-xs text-slate-600 mt-1">
          Personaliza la experiencia según tu rol
        </p>
      </div>

      <div className="p-2 space-y-1">
        <ModeOption
          icon={<User className="w-4 h-4" />}
          title="Padres & Psicólogos"
          description="Casos individuales y familiares"
          isActive={!isSchoolMode}
          onClick={() => handleModeSelect(false)}
          activeColor="blue"
        />

        <ModeOption
          icon={<Users className="w-4 h-4" />}
          title="Educadores"
          description="Gestión grupal y aula"
          isActive={isSchoolMode}
          onClick={() => handleModeSelect(true)}
          activeColor="green"
        />
      </div>

      <div className="p-3 bg-slate-50 border-t border-slate-100">
        <p className="text-xs text-slate-600">
          <span className="font-medium">Modo actual:</span>{" "}
          {isSchoolMode ? "Educadores" : "Individual"} - Las guías se adaptarán
          a tu contexto específico.
        </p>
      </div>
    </div>
  );

  return (
    <Dropdown trigger={trigger} align="right">
      {dropdownContent}
    </Dropdown>
  );
}
