import React from "react";
import { Users, User, Settings, ChevronDown, Star } from "lucide-react";
import { useRouter } from "next/navigation";
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
  const { mode, setMode } = useModeStore();
  const router = useRouter();

  const handleModeSelect = (newMode: "family" | "school" | "child") => {
    const currentMode = mode;
    setMode(newMode);

    // Solo redirigir cuando hay cambio de contexto
    if (newMode === "child" && currentMode !== "child") {
      // Ir a child mode
      router.push("/child/stories");
    } else if (currentMode === "child" && newMode !== "child") {
      // Salir de child mode
      router.push("/parentDashboard");
    }
    // Si cambio entre individual ↔ school: no redirect, solo cambio de modo
  };

  // Configuración de cada modo
  const getModeConfig = () => {
    switch (mode) {
      case "child":
        return {
          icon: <Star className="w-3 h-3" />,
          label: "Kids mode",
          bgColor: "bg-yellow-500/30 text-yellow-300",
          bgColorInline: "bg-yellow-100 text-yellow-600",
        };
      case "school":
        return {
          icon: <Users className="w-3 h-3" />,
          label: "Escuela",
          bgColor: "bg-green-500/30 text-green-300",
          bgColorInline: "bg-green-100 text-green-600",
        };
      default: // individual
        return {
          icon: <User className="w-3 h-3" />,
          label: "Modo padres",
          bgColor: "bg-blue-500/30 text-blue-300",
          bgColorInline: "bg-blue-100 text-blue-600",
        };
    }
  };

  const modeConfig = getModeConfig();

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
      return `${base} ${modeConfig.bgColor}`;
    }
    return `${base} ${modeConfig.bgColorInline}`;
  };

  const getTextColor = () => {
    return variant === "header" ? "text-white" : "text-current";
  };

  const trigger = (
    <button
      className={`${getTriggerStyles()} ${className}`}
      aria-label="Cambiar modo"
      aria-haspopup="menu"
    >
      <div className={getIconStyles()}>{modeConfig.icon}</div>
      <span className={`hidden sm:inline ${getTextColor()}`}>
        {modeConfig.label}
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
          title="Familia"
          description="Para padres y madres"
          isActive={mode === "family"}
          onClick={() => handleModeSelect("family")}
          activeColor="blue"
        />

        <ModeOption
          icon={<Users className="w-4 h-4" />}
          title="Escuela"
          description="Gestión grupal y aula"
          isActive={mode === "school"}
          onClick={() => handleModeSelect("school")}
          activeColor="green"
        />

        <ModeOption
          icon={<Star className="w-4 h-4" />}
          title="Niños"
          description="Experiencia segura para pequeños"
          isActive={mode === "child"}
          onClick={() => handleModeSelect("child")}
          activeColor="blue"
        />
      </div>

      <div className="p-3 bg-slate-50 border-t border-slate-100">
        <p className="text-xs text-slate-600">
          <span className="font-medium">Modo actual:</span>{" "}
          {mode === "child"
            ? "Modo Explorador"
            : mode === "school"
            ? "Escuela"
            : "Familia"}{" "}
          -
          {mode === "child"
            ? " Experiencia adaptada para niños."
            : " Las guías se adaptarán a tu contexto específico."}
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
