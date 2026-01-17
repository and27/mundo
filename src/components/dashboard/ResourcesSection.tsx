import React from "react";
import Link from "next/link";

const ResourcesSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="mi-text-title text-condor">Recursos y Guías MIM</h2>
      <p className="mi-text-body text-condor/80">
        Explora guías pedagógicas, materiales complementarios y recursos de
        formación sobre la Metodología Mundo Interior.
      </p>

      <div className="bg-white/70 rounded-md p-4 shadow-sm">
        <h3 className="mi-text-subtitle text-condor mb-3">
          Biblioteca de Recursos (Lofi)
        </h3>
        <ul className="list-disc list-inside mi-text-body-sm text-condor/90">
          <li>Guía Rápida MIM</li>
          <li>Materiales Imprimibles - Viaje Kuntur</li>
          <li>Taller Básico: Respiración para Niños</li>
        </ul>
      </div>

      <Link
        href="/dashboard/recursos/biblioteca"
        className="inline-block bg-green-500 text-white mi-text-label py-2 px-6 rounded-full hover:bg-green-600 transition"
      >
        Ver biblioteca completa
      </Link>
    </div>
  );
};

export default ResourcesSection;

