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
    <Link
      href={href}
      className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
        isActive
          ? "bg-jaguar text-white font-bold"
          : "text-condor/80 hover:bg-condor/10 hover:text-white"
      } ${isCollapsed ? "justify-center" : ""}`}
      title={isCollapsed ? label : ""}
    >
      {icon && React.cloneElement(icon)}
      <span
        className={`whitespace-nowrap transition-all duration-200 ${
          isCollapsed
            ? "md:hidden md:opacity-0 md:w-0 md:ml-0"
            : "md:opacity-100 md:w-auto md:ml-3"
        }`}
      >
        {label}
      </span>
    </Link>
  );
};

export default SidebarLink;
