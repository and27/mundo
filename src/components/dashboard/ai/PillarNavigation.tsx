interface Pillar {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

interface PillarNavigationProps {
  pillars: Pillar[];
  activePillar: number;
  onPillarChange: (index: number) => void;
}

export default function PillarNavigation({
  pillars,
  activePillar,
  onPillarChange,
}: PillarNavigationProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex gap-2">
        {pillars.map((pillar, index) => (
          <button
            key={index}
            onClick={() => onPillarChange(index)}
            className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
              activePillar === index
                ? "bg-white/10 text-white shadow-lg"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="text-lg">{pillar.icon}</span>
            <div className="text-left hidden sm:block">
              <div className="font-medium text-sm">{pillar.title}</div>
              <div className="text-xs opacity-70">{pillar.subtitle}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
