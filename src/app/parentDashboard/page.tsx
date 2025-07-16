"use client";
import { useDashboard } from "@/hooks/useDashboard";
import Sidebar from "../../components/dashboard/Sidebar";
import { Suspense, useEffect } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const FacilitatorDashboard = () => {
  const {
    isMobileOpen,
    isDesktopCollapsed,
    activeSection,
    toggleSidebar,
    closeMobileSidebar,
  } = useDashboard();

  const ActiveComponent = activeSection.component;

  // Bloquea scroll del fondo cuando el sidebar móvil está abierto
  useEffect(() => {
    if (isMobileOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileOpen]);

  return (
    <div className="bg-gradient-to-br from-[#1e1b4b] to-[#0c0a1d] min-h-screen flex">
      <Sidebar
        userName="Andrés"
        isMobileOpen={isMobileOpen}
        isDesktopCollapsed={isDesktopCollapsed}
        onCloseMobile={closeMobileSidebar}
        currentPath={`/parentDashboard?section=${activeSection.id}`}
      />

      <main className="flex-1 flex flex-col w-full overflow-x-hidden">
        <DashboardHeader
          sectionTitle={activeSection.label}
          sectionDescription={activeSection.description}
          onToggleSidebar={toggleSidebar}
        />

        <div className="flex-1 md:p-6 overflow-y-auto">
          <div className="max-w-7xl">
            <div className="bg-white/90 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-0 md:p-8 ">
                <ActiveComponent />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const FacilitatorDashboardPage = () => (
  <Suspense fallback={<div>Cargando...</div>}>
    <FacilitatorDashboard />
  </Suspense>
);

export default FacilitatorDashboardPage;
