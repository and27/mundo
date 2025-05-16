import React from "react";
import Link from "next/link";

const ResourcesSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-condor">Recursos y Guías MIM</h2>
      <p className="text-condor/80">
        Explora guías pedagógicas, materiales complementarios y recursos de
        formación sobre la Metodología Mundo Interior.
      </p>

      <div className="bg-white/70 rounded-md p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-condor mb-3">
          Biblioteca de Recursos (Lofi)
        </h3>
        <ul className="list-disc list-inside text-condor/90">
          <li>Guía Rápida MIM</li>
          <li>Materiales Imprimibles - Viaje Kuntur</li>
          <li>Taller Básico: Respiración para Niños</li>
        </ul>
      </div>

      <Link
        href="/dashboard/recursos/biblioteca"
        className="inline-block bg-green-500 text-white font-bold py-2 px-6 rounded-full hover:bg-green-600 transition"
      >
        Explorar Biblioteca Completa
      </Link>
    </div>
  );
};

export default ResourcesSection;
