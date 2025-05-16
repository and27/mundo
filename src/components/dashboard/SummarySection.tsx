import React from "react";
import Link from "next/link";

const SummarySection = () => {
  const childrenSummaryList = [
    {
      id: "child-1",
      name: "Niño Explorador",
      lastActivity: "Última Bitácora",
      activityDetail: "[Color Amarillo]",
      colorHex: "#FFD700",
      recentMoods: [
        { day: "Lun", color: "#A0AEC0" },
        { day: "Mar", color: "#ECC94B" },
        { day: "Mié", color: "#4299E1" },
        { day: "Jue", color: "#9F7AEA" },
        { day: "Hoy", color: "#FFD700" },
      ],
    },
    {
      id: "child-2",
      name: "Niña Curiosa",
      lastActivity: "Bitácora reciente",
      activityDetail: "[Color Azul]",
      colorHex: "#007BFF",
      recentMoods: [
        { day: "Mié", color: "#FC8181" },
        { day: "Jue", color: "#63B3ED" },
        { day: "Hoy", color: "#007BFF" },
      ],
    },
    {
      id: "child-3",
      name: "Pequeño Valiente",
      lastActivity: "Último Viaje",
      activityDetail: "Completado",
      colorHex: null,
      recentMoods: [],
    },
    {
      id: "child-4",
      name: "Alma Serena",
      lastActivity: "Sin actividad reciente",
      activityDetail: "",
      colorHex: null,
      recentMoods: [],
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-condor">Resumen de Niños</h2>
      <p className="text-condor/80">
        Vista general (con consentimiento) del progreso y las entradas recientes
        de la Bitácora de tus niños asociados.
      </p>

      <div className="space-y-4">
        {childrenSummaryList.map((child) => (
          <div
            key={child.id}
            className="bg-white rounded-lg p-4 shadow-md flex flex-col border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex flex-col">
                <span className="text-condor font-semibold text-lg">
                  {child.name}
                </span>
                <span className="text-condor/70 text-sm">
                  {child.lastActivity}
                </span>
              </div>
              <Link
                href={`/dashboard/ninos/${child.id}`}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Ver Detalle
              </Link>
            </div>

            {child.recentMoods && child.recentMoods.length > 0 ? (
              <div className="flex gap-2 items-center">
                <span className="text-condor/80 text-sm mr-1">
                  Bitácora Reciente:
                </span>
                {child.recentMoods.map((mood, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-xs text-condor/70"
                  >
                    <div
                      className="w-6 h-6 rounded-full mb-1"
                      style={{ backgroundColor: mood.color }}
                      title={`Día ${mood.day}: ${mood.color}`}
                    ></div>
                    <span>{mood.day}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-condor/60 text-sm italic">
                No hay registros recientes en la Bitácora.
              </p>
            )}
          </div>
        ))}
      </div>

      <p className="text-condor/60 italic text-center mt-6">
        (Para ver la lista completa de niños y más detalles, haz clic en
        &ldquo;Gestionar Niños&rdquo; en el menú lateral.)
      </p>
    </div>
  );
};

export default SummarySection;
