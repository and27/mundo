import Link from "next/link";
import React from "react";

interface SidebarLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  icon?: React.ReactNode; // Optional prop for an icon
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  label,
  isActive,
  icon,
}) => {
  return (
    <Link
      href={href}
      className={`
        block py-2 px-4 rounded transition
        ${
          isActive
            ? "bg-condor text-white font-semibold" // Active state styles (adjust colors as needed)
            : "hover:bg-condor/20 hover:text-condor" // Default and hover styles
        }
      `}
    >
      {icon && <span className="mr-3">{icon}</span>}
      {label}
    </Link>
  );
};

export default SidebarLink;
