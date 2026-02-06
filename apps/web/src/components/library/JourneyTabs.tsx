"use client";

interface Tab {
  key: string;
  label: string;
}

interface JourneyTabsProps {
  categories: Tab[];
  selected: string;
  onSelect: (key: string) => void;
}

export default function JourneyTabs({
  categories,
  selected,
  onSelect,
}: JourneyTabsProps) {
  return (
    <div className="flex justify-center gap-2 sm:gap-4 flex-wrap overflow-x-auto scrollbar-hide py-2">
      {categories.map((tab) => {
        const isActive = selected === tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => onSelect(tab.key)}
            className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
              ${
                isActive
                  ? "bg-yellow-400 text-black shadow-md"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
          >
            {tab.label}

            {isActive && (
              <span className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-60"></span>
            )}
          </button>
        );
      })}
    </div>
  );
}
