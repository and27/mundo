import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { dashboardSections } from "@/lib/dashboardConfig";

export function useDashboard() {
  const searchParams = useSearchParams();
  const sectionId = searchParams.get("section") || "inicio";
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const activeSection = useMemo(
    () =>
      dashboardSections.find((s) => s.id === sectionId) || dashboardSections[0],
    [sectionId]
  );

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsDesktopCollapsed((prev) => !prev);
    }
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const toggleDesktopCollapse = () => {
    setIsDesktopCollapsed((prev) => !prev);
  };

  return {
    isMobileOpen,
    isDesktopCollapsed,
    activeSection,
    isMobile,
    toggleSidebar,
    closeMobileSidebar,
    toggleMobileSidebar,
    toggleDesktopCollapse,
  };
}
