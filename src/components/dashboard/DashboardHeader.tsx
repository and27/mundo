import { FaBars } from "react-icons/fa";

interface DashboardHeaderProps {
  sectionTitle: string;
  sectionDescription: string;
  onToggleSidebar: () => void;
}

export default function DashboardHeader({
  sectionTitle,
  sectionDescription,
  onToggleSidebar,
}: DashboardHeaderProps) {
  return (
    <header className="backdrop-blur-md sticky top-0 z-20 border-b border-white/10 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="text-white p-2.5 -ml-2 rounded-xl hover:bg-white/10 transition-all"
            aria-label="Toggle Menu"
          >
            <FaBars className="text-lg" />
          </button>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-white">{sectionTitle}</h1>
            <p className="text-xs text-white/60">{sectionDescription}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
