import React from "react";
import Link from "next/link";
import { FaChild, FaPlus } from "react-icons/fa";
// import ChildAvatarPlaceholder from './ChildAvatarPlaceholder'; // Componente placeholder para el avatar

const ManageChildrenSection = () => {
  const childrenList = [
    { id: "child-1", name: "Niño Explorador" },
    { id: "child-2", name: "Niña Curiosa" },
    { id: "child-3", name: "Pequeño Valiente" },
    { id: "child-4", name: "Alma Serena" },
  ];

  return (
    <div className="text-white space-y-6">
      <h2 className="text-2xl font-bold ">Gestionar Cuentas de Niños</h2>
      <p className="">
        Aquí puedes ver y administrar las cuentas de niños asociadas a tu perfil
        de facilitador.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {childrenList.map((child) => (
          <div
            key={child.id}
            className="bg-white rounded-lg p-4 shadow-md flex items-center justify-between border border-gray-200" // Estilo de tarjeta mejorado
          >
            <div className="flex items-center">
              <div className="text-condor w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center mr-4 text-blue0 font-semibold">
                <FaChild className="text-xl" />
                {child.name.charAt(0)}
              </div>
              <span className="text-condor font-semibold text-lg">
                {child.name}
              </span>{" "}
              {/* Tipografía mejorada */}
            </div>

            <Link
              href={`/dashboard/ninos/${child.id}`}
              className="text-blue-600 hover:underline text-sm font-medium" // Estilo de enlace mejorado
            >
              Ver Perfil
            </Link>
          </div>
        ))}
      </div>

      <Link
        href="/dashboard/ninos/nuevo"
        className="inline-flex items-center bg-blue-500 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-600 transition shadow-md mt-6" // Estilo de botón mejorado
      >
        <FaPlus className="mr-2" />
        Añadir Nuevo Niño
      </Link>
    </div>
  );
};

export default ManageChildrenSection;
