import React, { ReactNode } from "react";

type MainContentAreaProps = {
  children: ReactNode;
};

const MainContentArea: React.FC<MainContentAreaProps> = ({ children }) => {
  return (
    <main className="flex-1 p-8 bg-black/10 backdrop-blur-sm rounded-lg m-4">
      {children}
    </main>
  );
};

export default MainContentArea;
