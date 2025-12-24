"use client";

import React from "react";

interface TabOption {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: TabOption[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}) => {
  return (
    <div className={`flex border-b border-condor/30 mb-6 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`py-3 px-4 md:px-6 -mb-px text-sm md:text-base font-medium focus:outline-none transition-colors duration-150 ease-in-out
            ${
              activeTab === tab.id
                ? "border-b-2 border-jaguar text-jaguar"
                : "text-condor/70 hover:border-b-2 hover:border-condor/50"
            }
          `}
          aria-current={activeTab === tab.id ? "page" : undefined}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
