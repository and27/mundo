"use client";

import React from "react";

interface ChipTabOption {
  id: string;
  label: string;
}

interface ChipTabsProps {
  tabs: ChipTabOption[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const ChipTabs: React.FC<ChipTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}) => {
  if (tabs.length === 0) return null;

  const activeIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.id === activeTab)
  );
  const segmentWidth = 100 / tabs.length;

  return (
    <div className={`flex justify-center ${className}`}>
      <div className="relative flex w-full max-w-md justify-between rounded-2xl bg-slate-100 p-1 text-center">
        <div
          className="pointer-events-none absolute inset-1 rounded-xl mi-card shadow-sm transition-transform duration-300 ease-out"
          style={{
            width: `${segmentWidth}%`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`text-xs md:text-sm relative z-10 flex-1 rounded-xl px-3 md:px-4 py-2 font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? "text-white"
                : "text-slate-500 hover:text-primary-700"
            }`}
            aria-current={activeTab === tab.id ? "page" : undefined}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChipTabs;
