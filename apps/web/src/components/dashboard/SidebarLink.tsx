"use client";
import Link from "next/link";
import React, { ReactElement } from "react";

interface SidebarLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  icon?: ReactElement;
  isCollapsed: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  label,
  isActive,
  icon,
  isCollapsed,
}) => {
  return (
    <div className="relative group">
      <Link
        href={href}
        className={`flex items-center p-3 rounded-lg transition-all duration-200 relative ${
          isActive
            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg"
            : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
        } ${isCollapsed ? "justify-center" : ""}`}
      >
        {/* Indicador activo */}
        {isActive && !isCollapsed && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
        )}

        {/* Ícono */}
        {icon && (
          <div
            className={`flex-shrink-0 w-5 h-5 ${
              isActive ? "text-white" : "text-slate-400"
            } ${isCollapsed ? "" : "mr-3"}`}
          >
            {React.cloneElement(icon)}
          </div>
        )}

        {/* Label */}
        <span
          className={`whitespace-nowrap transition-all duration-200 ${
            isCollapsed
              ? "md:hidden md:opacity-0 md:w-0 md:ml-0"
              : "md:opacity-100 md:w-auto"
          }`}
        >
          {label}
        </span>

        {/* Efecto hover para activo */}
        {isActive && (
          <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        )}
      </Link>

      {/* Tooltip para modo collapsed */}
      {isCollapsed && (
        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50 border border-slate-600">
          {label}
          <div className="absolute right-full top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45 border-l border-b border-slate-600"></div>
        </div>
      )}
    </div>
  );
};

export default SidebarLink;
