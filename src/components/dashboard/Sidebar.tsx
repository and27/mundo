import Image from "next/image";
import React, { ReactNode } from "react";

type SidebarProps = {
  children: ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div className="w-64 bg-fondo-sidebar p-4 min-h-screen shadow-lg">
      <div className="mb-8">
        <Image
          src="/images/logo-mundo.png"
          alt="Mundo Interior Logo"
          width={100}
          height={40}
        />
      </div>
      <nav className="flex flex-col gap-2">{children}</nav>
    </div>
  );
};

export default Sidebar;
