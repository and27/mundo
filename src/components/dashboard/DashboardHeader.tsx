import { FaBars } from "react-icons/fa";
import ModeToggle from "./ModeToggle";

interface DashboardHeaderProps {
  sectionTitle: string;
  sectionDescription: string;
  onToggleSidebar: () => void;
  showModeToggle?: boolean;
}

export default function DashboardHeader({
  sectionTitle,
  onToggleSidebar,
  showModeToggle = true,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-700/50">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="text-white p-2.5 -ml-2 rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Toggle Menu"
          >
            <FaBars className="text-lg" />
          </button>

          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-white leading-tight">
              {sectionTitle}
            </h1>
          </div>
        </div>

        {showModeToggle && <ModeToggle variant="header" />}
      </div>
    </header>
  );
}
