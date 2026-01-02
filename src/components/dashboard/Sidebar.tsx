"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { LogOut, User, MoreHorizontal } from "lucide-react";
import { dashboardSections } from "@/lib/dashboardConfig";
import { FaBars } from "react-icons/fa";
import { logoutUser } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

type SidebarProps = {
  userName?: string;
  userImageUrl?: string;
  isMobileOpen: boolean;
  isDesktopCollapsed: boolean;
  onCloseMobile: () => void;
  activeSectionId: string;
};

const NavItem = ({
  item,
  isCollapsed,
  isActive,
  onSelect,
}: {
  item: (typeof dashboardSections)[0];
  isCollapsed: boolean;
  isActive: boolean;
  onSelect?: () => void;
}) => {
  if (item.disabled) {
    return (
      <div className="relative group opacity-50">
        <div className="flex items-center p-3 rounded-lg">
          <div className="w-10 h-10 mi-surface-soft rounded-lg flex items-center justify-center">
            <item.icon className="w-5 h-5 text-white/40" />
          </div>

          {!isCollapsed && (
            <div className="ml-3">
              <span className="text-sm text-white/50">{item.label}</span>
              <span className="text-xs text-white/30 block">
                {item.description}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onSelect}
      className={[
        "relative flex items-center p-3 rounded-lg transition-colors",
        isActive
          ? "mi-nav-active text-white"
          : "text-white/70 hover:text-white hover:mi-accent-soft",
        isCollapsed ? "justify-center" : "",
      ].join(" ")}
    >
      <div
        className={[
          "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
          isActive ? "mi-nav-active-icon" : "mi-surface-soft",
        ].join(" ")}
      >
        <item.icon className="w-5 h-5" />
      </div>

      {!isCollapsed && (
        <div className="ml-3">
          <span className="text-sm font-semibold">{item.label}</span>
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
  activeSectionId,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const clearUser = useAuthStore((state) => state.clearUser);
  const userInitial = userName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutUser();
      clearUser();
      router.push("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity ${
          isMobileOpen
            ? "opacity-100 bg-black/50 backdrop-blur-[2px]"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside
        className={[
          "bg-primary-900 md:bg-transparent fixed md:relative top-0 left-0 z-50 h-[100dvh]",
          "border-r border-white/10",
          "flex flex-col justify-between transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          isDesktopCollapsed ? "md:w-24 p-4" : "md:w-72 p-6",
          "w-72",
        ].join(" ")}
      >
        <div>
          {!isDesktopCollapsed && (
            <div className="mb-8 pb-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 mi-accent-soft  rounded-xl flex items-center justify-center">
                  <span
                    className="md:hidden cursor-pointer"
                    onClick={onCloseMobile}
                  >
                    <FaBars color="white" />
                  </span>
                  <Image
                    src="/images/logo_simple.png"
                    alt="Mundo Interior"
                    width={40}
                    height={40}
                    className="hidden md:block"
                  />
                </div>

                <div>
                  <h1 className="text-lg font-bold text-white">
                    Mundo Interior
                  </h1>
                </div>
              </div>
            </div>
          )}

          <nav className="space-y-2">
            {dashboardSections.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                isCollapsed={isDesktopCollapsed}
                isActive={activeSectionId === item.id}
                onSelect={isMobileOpen ? onCloseMobile : undefined}
              />
            ))}
          </nav>
        </div>

        <div className="pb-safe">
          <div className="h-px bg-white/10" />

          <div className="">
            <button
              onClick={() => setShowUserMenu((v) => !v)}
              className={[
                "flex items-center w-full p-1 md:p-3 rounded-lg transition-colors",
                "hover:mi-accent-soft",
                isDesktopCollapsed ? "justify-center" : "",
              ].join(" ")}
            >
              <div
                className={[
                  "w-10 h-10 mi-accent-gradient rounded-lg flex items-center justify-center",
                  !isDesktopCollapsed && "mr-3",
                ].join(" ")}
              >
                {userImageUrl ? (
                  <Image
                    src={userImageUrl}
                    alt="Avatar"
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

              {!isDesktopCollapsed && (
                <>
                  <span className="flex-1 text-left text-sm font-semibold text-white">
                    {userName}
                  </span>
                  <MoreHorizontal className="w-4 h-4 text-white/50" />
                </>
              )}
            </button>
            <div>
              {showUserMenu && !isDesktopCollapsed && (
                <div className="absolute bottom-full left-0 right-0 mb-2 mi-surface-dark rounded-xl p-2">
                  <Link
                    href="/dashboard/perfil"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:mi-accent-soft text-white/80 hover:text-white"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm">Ver perfil</span>
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={[
                "flex items-center w-full p-1 md:p-3 rounded-lg transition-colors",
                isLoggingOut
                  ? "opacity-50 cursor-not-allowed"
                  : "text-red-400 hover:bg-red-500/20",
                isDesktopCollapsed ? "justify-center" : "",
              ].join(" ")}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-red-500/20">
                <LogOut
                  className={`w-4 h-4 ${isLoggingOut ? "animate-spin" : ""}`}
                />
              </div>

              {!isDesktopCollapsed && (
                <span className="ml-3 text-sm font-semibold">
                  {isLoggingOut ? "Cerrando…" : "Cerrar sesión"}
                </span>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
