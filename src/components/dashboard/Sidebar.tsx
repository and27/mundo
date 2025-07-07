"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { LogOut, User, MoreHorizontal } from "lucide-react";
import { HiSparkles } from "react-icons/hi2";
import { dashboardSections } from "@/lib/dashboardConfig";

type SidebarProps = {
  userName?: string;
  userImageUrl?: string;
  isMobileOpen: boolean;
  isDesktopCollapsed: boolean;
  onCloseMobile: () => void;
  currentPath?: string;
};

const NavItem = ({
  item,
  isCollapsed,
  isActive,
}: {
  item: (typeof dashboardSections)[0];
  isCollapsed: boolean;
  isActive: boolean;
}) => {
  if (item.disabled) {
    return (
      <div className="relative group">
        <div className="flex items-center p-3 rounded-lg opacity-50 cursor-not-allowed">
          <div className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center">
            <item.icon className="w-5 h-5 text-slate-400" />
          </div>
          {!isCollapsed && (
            <div className="ml-3">
              <span className="text-sm text-slate-300">{item.label}</span>
              <span className="text-xs text-slate-500 block">
                {item.description}
              </span>
            </div>
          )}
        </div>

        {isCollapsed && (
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50 border border-slate-600">
            {item.label} - {item.description}
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45 border-l border-b border-slate-600"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={`text-white flex items-center p-3 rounded-lg transition-all duration-200 group ${
        isActive
          ? "bg-indigo-600/80 text-white shadow-lg"
          : "hover:bg-slate-800/50 text-slate-300 hover:text-white"
      } ${isCollapsed ? "justify-center" : ""}`}
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          isActive
            ? "bg-indigo-500/30"
            : "bg-slate-800/50 group-hover:bg-slate-700/50"
        }`}
      >
        <item.icon className="w-5 h-5" />
      </div>

      {!isCollapsed && (
        <div className="ml-3">
          <span className="text-sm font-semibold">{item.label}</span>
          <span className="text-xs text-slate-300 block">
            {item.description}
          </span>
        </div>
      )}

      {isCollapsed && (
        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50 border border-slate-600">
          {item.label}
          <div className="absolute right-full top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45 border-l border-b border-slate-600"></div>
        </div>
      )}
    </Link>
  );
};

const Sidebar: React.FC<SidebarProps> = ({
  userName = "Guía",
  userImageUrl,
  isMobileOpen,
  isDesktopCollapsed,
  onCloseMobile,
  currentPath = "/dashboard",
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 md:hidden ${
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 left-0 bg-slate-900/95 backdrop-blur-sm border-r border-slate-700/50 shadow-xl flex flex-col justify-between z-50 transform transition-all duration-300 ease-out md:relative md:h-screen md:top-auto md:left-auto md:transform-none ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${isDesktopCollapsed ? "md:w-20" : "md:w-72"} h-full w-72`}
      >
        <div className="p-6">
          {!isDesktopCollapsed && (
            <div className="mb-8 pb-6 border-b border-slate-700/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <HiSparkles className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-1">
                  <h1 className="text-xl font-bold text-white">
                    Mundo Interior
                  </h1>
                  <p className="text-sm text-slate-400 font-medium">
                    Panel de Guía
                  </p>
                </div>
              </div>
            </div>
          )}

          {isDesktopCollapsed && (
            <div className="mb-8 flex justify-center">
              <div className="relative group">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <HiSparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
                  Mundo Interior
                  <div className="absolute right-full top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                </div>
              </div>
            </div>
          )}

          <nav className="space-y-2">
            {dashboardSections.map((item) => {
              const isItemActive = currentPath === item.href;

              return (
                <NavItem
                  key={item.id}
                  item={item}
                  isCollapsed={isDesktopCollapsed}
                  isActive={isItemActive}
                />
              );
            })}
          </nav>
        </div>

        <div className="p-6 space-y-4">
          <div className="h-px bg-slate-700/50"></div>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex items-center w-full p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-200 ${
                isDesktopCollapsed ? "justify-center" : ""
              }`}
            >
              <div className="relative">
                <div
                  className={`flex-shrink-0 w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center ${
                    isDesktopCollapsed ? "" : "mr-3"
                  }`}
                >
                  {userImageUrl ? (
                    <Image
                      src={userImageUrl}
                      alt="Avatar de Usuario"
                      width={32}
                      height={32}
                      className="rounded-lg object-cover"
                    />
                  ) : (
                    <span className="text-white font-semibold text-sm">
                      {userInitial}
                    </span>
                  )}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
              </div>

              {!isDesktopCollapsed && (
                <>
                  <div className="flex flex-col flex-1 text-left">
                    <span className="text-sm font-semibold text-white">
                      {userName}
                    </span>
                    <span className="text-xs text-slate-400">En línea</span>
                  </div>
                  <MoreHorizontal className="w-4 h-4 text-slate-400" />
                </>
              )}
            </button>

            {showUserMenu && !isDesktopCollapsed && (
              <div className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-slate-800 border border-slate-600 rounded-lg shadow-lg">
                <Link
                  href="/dashboard/perfil"
                  onClick={() => {
                    onCloseMobile();
                    setShowUserMenu(false);
                  }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700 transition-colors text-slate-300 hover:text-white"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm">Ver perfil</span>
                </Link>
              </div>
            )}

            {isDesktopCollapsed && (
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50 border border-slate-600">
                {userName}
                <div className="absolute right-full top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45 border-l border-b border-slate-600"></div>
              </div>
            )}
          </div>

          <Link
            href="/acceso"
            onClick={onCloseMobile}
            className={`flex items-center p-3 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all duration-200 group ${
              isDesktopCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
              <LogOut className="h-4 w-4" />
            </div>

            {!isDesktopCollapsed && (
              <div className="flex flex-col ml-3">
                <span className="text-sm font-semibold">Cerrar Sesión</span>
                <span className="text-xs text-red-400/70">Salir del panel</span>
              </div>
            )}

            {isDesktopCollapsed && (
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50 border border-slate-600">
                Cerrar Sesión
                <div className="absolute right-full top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45 border-l border-b border-slate-600"></div>
              </div>
            )}
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
