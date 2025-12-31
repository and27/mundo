import React from "react";

interface PillarConfig {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
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
        className={`bg-white overflow-hidden border border-neutral-200 rounded-3xl shadow-sm" transition-all duration-300 cursor-pointer ${
          isActive
            ? `shadow-xl scale-[1.01]`
            : "hover:border-primary-200 hover:shadow-lg"
        }`}
        onClick={onClick}
      >
        <div className={`mi-accent-soft mb-4 p-3 md:p-5`}>
          <div className="flex items-center gap-4">
            <div
              className={`w-10 h-10 border border-primary-300 rounded-xl flex items-center justify-center shadow-sm`}
            >
              <div className="text-primary-800">{pillar.icon}</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary-800 mb-1">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate-600">{pillar.subtitle}</p>
            </div>
          </div>
        </div>

        {isActive && (
          <div className="md:p-3 pt-0 duration-300">
            <div className="pt-2">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PillarCard;
