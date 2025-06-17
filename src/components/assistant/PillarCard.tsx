import React from "react";

interface PillarConfig {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  gradientFrom: string;
  gradientTo: string;
  bgAccent: string;
  borderAccent: string;
}

interface PillarCardProps {
  pillar: PillarConfig;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const PillarCard: React.FC<PillarCardProps> = ({
  pillar,
  isActive,
  onClick,
  children,
}) => {
  return (
    <div className="group">
      <div
        className={`bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
          isActive
            ? `${pillar.borderAccent} shadow-xl scale-[1.01]`
            : "hover:border-indigo-200 hover:shadow-lg"
        }`}
        onClick={onClick}
      >
        <div
          className={`p-4 md:p-8 ${isActive ? pillar.bgAccent : "bg-white/50"}`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-10 h-10 bg-gradient-to-r ${pillar.gradientFrom} ${pillar.gradientTo} rounded-xl flex items-center justify-center shadow-lg`}
            >
              <div className="text-white">{pillar.icon}</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-indigo-900 mb-1">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate-600">{pillar.subtitle}</p>
            </div>
            <div
              className={`transition-transform duration-300 ${
                isActive ? "rotate-180" : ""
              }`}
            >
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {isActive && (
          <div className="p-6 pt-0 animate-in slide-in-from-top-2 duration-300">
            <div className="border-t border-slate-200 pt-6">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PillarCard;
