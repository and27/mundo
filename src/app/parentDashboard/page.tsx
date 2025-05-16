"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Sidebar from "../../components/dashboard/Sidebar";
import SidebarLink from "../../components/dashboard/SidebarLink";
import MainContentArea from "../../components/dashboard/MainContentArea";

import ManageChildrenSection from "../../components/dashboard/ManageChildrenSection";
import ResourcesSection from "../../components/dashboard/ResourcesSection";
import SummarySection from "../../components/dashboard/SummarySection";
import { Suspense } from "react";

const FacilitatorDashboard = () => {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  const renderSection = () => {
    switch (section) {
      case "ninos":
        return <ManageChildrenSection />;
      case "recursos":
        return <ResourcesSection />;
      case "resumen":
        return <SummarySection />;
      default:
        return (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-condor">
              Bienvenida/o al Dashboard
            </h1>
            <p className="text-condor/80">
              Selecciona una opción del menú lateral para empezar.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="text-white min-h-screen flex text-condor">
      <Sidebar>
        <div className="ml-2 mb-8 pb-4 border-b border-condor/30">
          <h2 className=" text-xl font-bold">Bienvenida/o</h2>
          <Link
            href="/dashboard/perfil"
            className="hover:underline text-sm mr-2"
          >
            Perfil
          </Link>
          <Link href="/acceso" className="hover:underline text-sm ml-2">
            Cerrar Sesión
          </Link>
        </div>

        <SidebarLink
          href="/parentDashboard?section=ninos"
          label="Gestionar Niños"
          isActive={section === "ninos"}
        />
        <SidebarLink
          href="/parentDashboard?section=recursos"
          label="Recursos y Guías MIM"
          isActive={section === "recursos"}
        />
        <SidebarLink
          href="/parentDashboard?section=resumen"
          label="Resumen de Niños"
          isActive={section === "resumen"}
        />
      </Sidebar>

      <MainContentArea>{renderSection()}</MainContentArea>
    </div>
  );
};

const FacilitatorDashboardPage = () => (
  <Suspense
    fallback={
      <div className="min-h-screen flex items-center justify-center text-condor">
        Cargando Dashboard...
      </div>
    }
  >
    <FacilitatorDashboard />
  </Suspense>
);

export default FacilitatorDashboardPage;
