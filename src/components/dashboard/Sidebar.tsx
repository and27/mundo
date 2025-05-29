"use client";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

type SidebarProps = {
  children: ReactNode;
  userName?: string;
  userImageUrl?: string;
  isMobileOpen: boolean;
  isDesktopCollapsed: boolean;
  onCloseMobile: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  children,
  userName = "Guía",
  userImageUrl,
  isMobileOpen,
  isDesktopCollapsed,
  onCloseMobile,
}) => {
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <>
      {/* Overlay móvil mejorado */}
      <div
        className={`fixed inset-0 bg-gradient-to-r from-black/70 to-black/50 z-40 transition-all duration-300 md:hidden backdrop-blur-sm ${
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 left-0 bg-gradient-to-b from-fondo-sidebar to-fondo-sidebar/95 p-5 h-full shadow-2xl flex flex-col justify-between border-r border-condor/30 z-50 transform transition-all duration-300 ease-in-out md:relative md:h-screen md:top-auto md:left-auto md:transform-none backdrop-blur-sm ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${isDesktopCollapsed ? "md:w-20" : "md:w-72"}`}
      >
        {/* Header del sidebar */}
        <div>
          {!isDesktopCollapsed && (
            <div className="mb-8 pb-4 border-b border-condor/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-jaguar to-jaguar/80 rounded-xl flex items-center justify-center shadow-lg">
                  <HiSparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-condor">
                    Mundo Interior
                  </h1>
                  <p className="text-xs text-condor/60">Panel de Guía</p>
                </div>
              </div>
            </div>
          )}

          {isDesktopCollapsed && (
            <div className="mb-6 flex justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-jaguar to-jaguar/80 rounded-xl flex items-center justify-center shadow-lg">
                <HiSparkles className="w-5 h-5 text-white" />
              </div>
            </div>
          )}

          {/* Navegación */}
          <nav className="flex flex-col gap-1">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  isCollapsed: isDesktopCollapsed,
                  /* eslint-disable  @typescript-eslint/no-explicit-any */
                } as any);
              }
              return child;
            })}
          </nav>
        </div>

        {/* Footer del sidebar mejorado */}
        <div className="space-y-3">
          {/* Línea divisoria elegante */}
          <div className="h-px bg-gradient-to-r from-transparent via-condor/30 to-transparent"></div>

          {/* Perfil de usuario */}
          <Link
            href="/dashboard/perfil"
            onClick={onCloseMobile}
            className={`flex items-center p-3 rounded-xl hover:bg-gradient-to-r hover:from-condor/10 hover:to-jaguar/10 transition-all duration-200 group border border-transparent hover:border-condor/20 ${
              isDesktopCollapsed ? "justify-center" : ""
            }`}
            title={isDesktopCollapsed ? `Perfil de ${userName}` : ""}
          >
            <div
              className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br from-jaguar via-jaguar to-jaguar/80 text-white rounded-xl flex items-center justify-center text-sm font-bold group-hover:scale-105 transition-all duration-200 shadow-lg ${
                isDesktopCollapsed ? "" : "mr-3"
              }`}
            >
              {userImageUrl ? (
                <Image
                  src={userImageUrl}
                  alt="Avatar de Usuario"
                  width={40}
                  height={40}
                  className="rounded-xl object-cover"
                />
              ) : (
                <span className="text-white">{userInitial}</span>
              )}
            </div>

            {!isDesktopCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-condor group-hover:text-jaguar transition-colors">
                  {userName}
                </span>
                <span className="text-xs text-condor/60 group-hover:text-condor/80 transition-colors">
                  Ver perfil
                </span>
              </div>
            )}

            {!isDesktopCollapsed && (
              <FaUser className="w-4 h-4 text-condor/40 ml-auto group-hover:text-condor/60 transition-colors" />
            )}
          </Link>

          {/* Botón de cerrar sesión mejorado */}
          <Link
            href="/acceso"
            onClick={onCloseMobile}
            className={`flex items-center p-3 rounded-xl hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-400/10 text-red-500 hover:text-red-400 transition-all duration-200 group border border-transparent hover:border-red-500/20 ${
              isDesktopCollapsed ? "justify-center" : ""
            }`}
            title={isDesktopCollapsed ? "Cerrar Sesión" : ""}
          >
            <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center group-hover:bg-red-500/20 transition-all duration-200">
              <FaSignOutAlt className="h-4 w-4 flex-shrink-0" />
            </div>

            {!isDesktopCollapsed && (
              <div className="flex flex-col ml-3">
                <span className="text-sm font-medium">Cerrar Sesión</span>
                <span className="text-xs text-red-400/60">Salir del panel</span>
              </div>
            )}
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
