import { useState, useMemo, useEffect, useCallback } from "react";
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

  const toggleSidebar = useCallback(() => {
    if (isMobile) setIsMobileOpen((prev) => !prev);
    else setIsDesktopCollapsed((prev) => !prev);
  }, [isMobile]);

  const closeMobileSidebar = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

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
