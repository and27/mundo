"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { FaBars, FaSearch, FaBell, FaQuestionCircle } from "react-icons/fa";
import { FiHome, FiUsers, FiBookOpen, FiActivity } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import Sidebar from "../../components/dashboard/Sidebar";
import SidebarLink from "../../components/dashboard/SidebarLink";
import ManageChildrenSection from "../../components/dashboard/ManageChildrenSection";
import DashboardWelcomeSection from "../../components/dashboard/DashboardWelcomeSection";
import ResourcesPageLayout from "@/components/dashboard/resources/ResourcesPageLayout";
import EmotionalJournalSection from "@/components/dashboard/EmotionalJournalSection";

const FacilitatorDashboard = () => {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Actualizar tiempo cada minuto
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const renderSection = () => {
    switch (section) {
      case "ninos":
        return <ManageChildrenSection />;
      case "recursos":
        return <ResourcesPageLayout />;
      case "bitacora":
        return <EmotionalJournalSection />;
      default:
        return <DashboardWelcomeSection />;
    }
  };

  const getSectionTitle = () => {
    switch (section) {
      case "ninos":
        return "Mis Exploradores";
      case "recursos":
        return "Centro de Guías MIM";
      case "bitacora":
        return "Bitácora Emocional";
      default:
        return "Panel Principal";
    }
  };

  const getSectionDescription = () => {
    switch (section) {
      case "ninos":
        return "Gestiona y acompaña el progreso de tus exploradores";
      case "recursos":
        return "Accede a guías, recursos y materiales educativos";
      case "bitacora":
        return "Registra y analiza el desarrollo emocional";
      default:
        return "Bienvenido a tu espacio de acompañamiento";
    }
  };

  const currentUser = {
    name: "Andrés",
    role: "Guía Principal",
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  return (
    <div className="bg-gradient-to-br text-condor min-h-screen flex">
      <Sidebar
        userName={currentUser.name}
        isMobileOpen={isMobileOpen}
        isDesktopCollapsed={isDesktopCollapsed}
        onCloseMobile={() => setIsMobileOpen(false)}
      >
        <SidebarLink
          href="/parentDashboard"
          label="Inicio"
          icon={<FiHome />}
          isActive={!section}
          isCollapsed={true}
        />
        <SidebarLink
          href="/parentDashboard?section=ninos"
          label="Mis Exploradores"
          icon={<FiUsers />}
          isActive={section === "ninos"}
          isCollapsed={true}
        />
        <SidebarLink
          href="/parentDashboard?section=recursos"
          label="Centro de Guías MIM"
          icon={<FiBookOpen />}
          isActive={section === "recursos"}
          isCollapsed={true}
        />
        <SidebarLink
          href="/parentDashboard?section=bitacora"
          label="Bitácora Emocional"
          icon={<FiActivity />}
          isActive={section === "bitacora"}
          isCollapsed={true}
        />
      </Sidebar>

      <main className="flex-1 flex flex-col w-full overflow-x-hidden">
        <header className="backdrop-blur-md sticky top-0 z-20 border-b border-condor/10 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setIsMobileOpen(!isMobileOpen);
                  setIsDesktopCollapsed(!isDesktopCollapsed);
                }}
                className="text-condor p-2.5 -ml-2 rounded-xl hover:bg-gradient-to-r hover:from-condor/10 hover:to-jaguar/10 transition-all duration-200 group border border-transparent hover:border-condor/20"
                aria-label="Toggle Menu"
              >
                <FaBars className="text-lg group-hover:scale-110 transition-transform" />
              </button>

              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-condor">
                  {getSectionTitle()}
                </h1>
                <p className="text-xs text-condor/60">
                  {getSectionDescription()}
                </p>
              </div>
            </div>

            {/* <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-3 mr-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-condor">
                    {getGreeting()}, {currentUser.name}
                  </p>
                  <p className="text-xs text-condor/60">
                    {currentTime.toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-jaguar to-jaguar/80 rounded-lg flex items-center justify-center">
                  <HiSparkles className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="p-2.5 text-condor/70 hover:text-condor hover:bg-condor/10 rounded-xl transition-all duration-200"
                  title="Buscar"
                >
                  <FaSearch className="w-4 h-4" />
                </button>

                <button
                  className="p-2.5 text-condor/70 hover:text-condor hover:bg-condor/10 rounded-xl transition-all duration-200 relative"
                  title="Notificaciones"
                >
                  <FaBell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
                    2
                  </span>
                </button>

                <button
                  className="p-2.5 text-condor/70 hover:text-condor hover:bg-condor/10 rounded-xl transition-all duration-200"
                  title="Ayuda"
                >
                  <FaQuestionCircle className="w-4 h-4" />
                </button>
              </div>
            </div> */}
          </div>
        </header>

        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-7xl ml-5 md:ml-12">
            <div className="mb-6">
              <nav className="flex items-center gap-2 text-sm text-condor/60">
                <span>Panel</span>
                <span>/</span>
                <span className="text-condor font-medium">
                  {getSectionTitle()}
                </span>
              </nav>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 md:p-8">{renderSection()}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const FacilitatorDashboardPage = () => (
  <Suspense
    fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-jaguar to-jaguar/80 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <HiSparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-condor mb-2">
            Cargando Dashboard
          </h2>
          <p className="text-condor/60">Preparando tu espacio de trabajo...</p>

          {/* Barra de progreso en loading */}
          <div className="w-64 bg-condor/20 rounded-full h-2 mt-4 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: "60%",
                backgroundImage:
                  "linear-gradient(135deg, #D97706 0%, #F59E0B 50%, #EAB308 100%)",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>
    }
  >
    <FacilitatorDashboard />
  </Suspense>
);

export default FacilitatorDashboardPage;
