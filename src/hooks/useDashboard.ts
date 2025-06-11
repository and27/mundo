import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { dashboardSections } from "@/lib/dashboardConfig";

export function useDashboard() {
  const searchParams = useSearchParams();
  const sectionId = searchParams.get("section") || "inicio";

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  const activeSection = useMemo(
    () =>
      dashboardSections.find((s) => s.id === sectionId) || dashboardSections[0],
    [sectionId]
  );

  const toggleSidebar = () => {
    setIsMobileOpen((prev) => !prev);
    setIsDesktopCollapsed((prev) => !prev);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return {
    isMobileOpen,
    isDesktopCollapsed,
    activeSection,
    toggleSidebar,
    closeMobileSidebar,
  };
}
