"use client";

import React from "react";
import Link from "next/link";
import {
  FaChild,
  FaPlus,
  FaEdit,
  FaChartLine,
  FaExternalLinkAlt,
  FaGamepad,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import Image from "next/image";

interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatarUrl?: string;
  lastJourney?: string;
  nextSuggestedJourney?: string;
  totalJourneys: number;
  favoritePlatform?: "web" | "tablet" | "phone";
}

const childrenList: ChildProfile[] = [
  {
    id: "child-1",
    name: "Lucía Martínez",
    age: 8,
    avatarUrl: "/guides/yachay-transparent.png",
    lastJourney: "El Sendero del Puma Valiente",
    nextSuggestedJourney: "El Río de las Emociones con Amaru",
    totalJourneys: 3,
    favoritePlatform: "tablet",
  },
  {
    id: "child-2",
    name: "Mateo González",
    age: 6,
    avatarUrl: "/guides/kuntur-transparent.png",
    lastJourney: "Los Ojos del Cóndor",
    nextSuggestedJourney: "La Calma de Hatun Tortuga",
    totalJourneys: 2,
    favoritePlatform: "web",
  },
  {
    id: "child-3",
    name: "Sofía Rodríguez",
    age: 10,
    totalJourneys: 0,
    favoritePlatform: "tablet",
  },
];

const ManageChildrenSection = () => {
  const generateChildAccessCode = (childId: string) => {
    return (
      childId.toUpperCase().slice(-4) +
      Math.random().toString(36).slice(-2).toUpperCase()
    );
  };

  return (
    <div className="text-primary-800 space-y-8 p-4 md:p-6">
      <header className="rounded space-y-4">
        <div className="text-white  flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center">
            <FaChild className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-condor">
              Gestión de Perfiles
            </h1>
            <p className="text-lg text-condor/80">
              Administra los perfiles de tus hijos y su progreso en Mundo
              Interior
            </p>
          </div>
        </div>

        <div className="mt-10 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FaGamepad className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Plataforma Infantil Separada
              </h3>
              <p className="text-blue-800 mb-3 leading-relaxed">
                Tus hijos accederán a Mundo Interior a través de una plataforma
                especialmente diseñada para su edad, con interfaces más
                amigables, controles parentales integrados y experiencias
                adaptadas.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  ✨ Interfaz adaptada por edad
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  🛡️ Controles parentales
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  🎮 Experiencia gamificada
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Estado vacío mejorado */}
      {childrenList.length === 0 && (
        <div
          className="bg-gradient-to-br from-white to-gray-50 border-2 border-dashed border-condor/30 rounded-xl p-8 text-center"
          role="region"
          aria-labelledby="empty-state-title"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-jaguar/20 to-jaguar/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaChild className="w-10 h-10 text-jaguar/60" />
          </div>
          <h2
            id="empty-state-title"
            className="text-2xl font-bold text-condor mb-3"
          >
            ¡Crea el primer perfil!
          </h2>
          <p className="text-condor/70 mb-6 max-w-md mx-auto leading-relaxed">
            Configura un perfil para tu hijo/a y podrás seguir su progreso
            mientras explora Mundo Interior en su propia plataforma adaptada.
          </p>
          <Link
            href="/dashboard/explorers/new"
            className="inline-flex items-center bg-gradient-to-r from-jaguar to-jaguar/90 hover:from-jaguar/90 hover:to-jaguar/80 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-jaguar/30"
            aria-label="Crear nuevo perfil de explorador"
          >
            <FaPlus className="mr-2" aria-hidden="true" />
            Crear Primer Perfil
          </Link>
        </div>
      )}

      {childrenList.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {childrenList.map((child) => (
            <article
              key={child.id}
              className="bg-white rounded-xl  shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden focus-within:ring-2 focus-within:ring-jaguar/30"
              role="article"
              aria-labelledby={`child-name-${child.id}`}
            >
              <div className="p-6 pb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="relative w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center overflow-hidden ring-4 ring-white shadow-sm"
                    role="img"
                    aria-label={`Avatar de ${child.name}`}
                  >
                    {child.avatarUrl ? (
                      <Image
                        src={child.avatarUrl}
                        alt=""
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    ) : (
                      <FaChild
                        className="text-2xl text-condor/50"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      id={`child-name-${child.id}`}
                      className="text-xl font-bold text-condor truncate"
                    >
                      {child.name}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-condor/60 mt-1">
                      <span>{child.age} años</span>
                      <span>•</span>
                      <span>{child.totalJourneys} viajes</span>
                    </div>
                  </div>
                </div>

                {/* Progreso */}
                {child.lastJourney && (
                  <div className="space-y-2 mb-4">
                    <div className="text-xs font-medium text-condor/60 uppercase tracking-wide">
                      Último viaje completado
                    </div>
                    <p className="text-sm text-condor font-medium">
                      {child.lastJourney}
                    </p>
                  </div>
                )}

                {/* Sugerencia de IA */}
                {child.nextSuggestedJourney && (
                  <div className="bg-gradient-to-r from-jaguar/10 to-jaguar/5 border border-jaguar/20 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <HiSparkles
                        className="w-4 h-4 text-jaguar"
                        aria-hidden="true"
                      />
                      <span className="text-xs font-semibold text-jaguar uppercase tracking-wide">
                        Amaru IA Sugiere
                      </span>
                    </div>
                    <p className="text-sm text-condor/80">
                      {child.nextSuggestedJourney}
                    </p>
                  </div>
                )}

                {/* Código de acceso */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-medium text-condor/60 uppercase tracking-wide mb-1">
                        Código de acceso infantil
                      </div>
                      <code className="text-sm font-mono font-bold text-condor bg-white px-2 py-1 rounded border">
                        {generateChildAccessCode(child.id)}
                      </code>
                    </div>
                    <button
                      className="text-xs text-jaguar hover:text-jaguar/80 font-medium focus:outline-none focus:underline"
                      aria-label={`Copiar código de acceso para ${child.name}`}
                    >
                      Copiar
                    </button>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href={`/dashboard/explorers/${child.id}/progress`}
                    className="flex items-center justify-center gap-2 bg-condor/5 hover:bg-condor/10 text-condor border border-condor/20 py-2.5 px-3 rounded-lg transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-condor/30"
                    aria-label={`Ver progreso de ${child.name}`}
                  >
                    <FaChartLine className="w-4 h-4" aria-hidden="true" />
                    <span>Progreso</span>
                  </Link>
                  <Link
                    href={`/dashboard/explorers/${child.id}/edit`}
                    className="flex items-center justify-center gap-2 bg-jaguar/10 hover:bg-jaguar/20 text-jaguar border border-jaguar/20 py-2.5 px-3 rounded-lg transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-jaguar/30"
                    aria-label={`Editar perfil de ${child.name}`}
                  >
                    <FaEdit className="w-4 h-4" aria-hidden="true" />
                    <span>Editar</span>
                  </Link>
                </div>

                {/* Enlace a plataforma infantil */}
                <Link
                  href={`/kids-platform?code=${generateChildAccessCode(
                    child.id
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2.5 px-3 rounded-lg transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300"
                  aria-label={`Abrir plataforma infantil para ${child.name} en nueva ventana`}
                >
                  <FaGamepad className="w-4 h-4" aria-hidden="true" />
                  <span>Abrir Plataforma Infantil</span>
                  <FaExternalLinkAlt className="w-3 h-3" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Botón para agregar más perfiles */}
      {childrenList.length > 0 && (
        <div className="text-center pt-4">
          <Link
            href="/dashboard/explorers/new"
            className="inline-flex items-center bg-yellow-400 text-black py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-jaguar/30"
            aria-label="Agregar nuevo perfil de explorador"
          >
            <FaPlus className="mr-2" aria-hidden="true" />
            Agregar Nuevo Perfil
          </Link>
        </div>
      )}

      {/* Información adicional */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mt-8">
        <h3 className="text-lg font-semibold text-amber-900 mb-3 flex items-center gap-2">
          <HiSparkles className="w-5 h-5" aria-hidden="true" />
          ¿Cómo funciona?
        </h3>
        <div className="space-y-3 text-amber-800">
          <div className="flex items-start gap-3">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-amber-200 text-amber-800 rounded-full text-xs font-bold flex-shrink-0 mt-0.5">
              1
            </span>
            <p>
              Crea y configura el perfil de tu hijo/a desde esta plataforma
              parental
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-amber-200 text-amber-800 rounded-full text-xs font-bold flex-shrink-0 mt-0.5">
              2
            </span>
            <p>
              Comparte el código de acceso con tu hijo/a para que acceda a su
              plataforma
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-amber-200 text-amber-800 rounded-full text-xs font-bold flex-shrink-0 mt-0.5">
              3
            </span>
            <p>
              Sigue su progreso y desarrollo emocional desde aquí mientras ellos
              disfrutan su experiencia
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageChildrenSection;
