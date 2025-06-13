import React from "react";

interface ModeOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
  activeColor: "blue" | "green";
}

export default function ModeOption({
  icon,
  title,
  description,
  isActive,
  onClick,
  activeColor,
}: ModeOptionProps) {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-900",
      iconBg: "bg-gradient-to-r from-blue-500 to-cyan-600",
      dot: "bg-blue-500",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-900",
      iconBg: "bg-gradient-to-r from-green-500 to-emerald-600",
      dot: "bg-green-500",
    },
  };

  const colors = colorClasses[activeColor];

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
        isActive
          ? `${colors.bg} border ${colors.border} ${colors.text}`
          : "hover:bg-slate-50 text-slate-700"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          isActive
            ? `${colors.iconBg} text-white`
            : "bg-slate-100 text-slate-500"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs opacity-75">{description}</p>
      </div>
      {isActive && <div className={`w-2 h-2 ${colors.dot} rounded-full`} />}
    </button>
  );
}
