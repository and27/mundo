"use client";

import Link from "next/link";
import { Plus, Gamepad2, Heart, Users, Sparkles } from "lucide-react";
import ExplorerCard from "./ExplorerCard";
import { childrenList } from "@/lib/mockChildren";

export default function ManageChildrenSection() {
  return (
    <div className="space-y-8">
      {/* Información sobre la plataforma infantil */}
      <div className="flex items-start justify-start bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
        {/* Botón para agregar nuevo perfil */}
        {childrenList.length > 0 && (
          <div className="flex-1 text-center">
            <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl max-w-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-slate-800">
                    ¿Otro explorador?
                  </h3>
                  <p className="text-sm text-slate-600">
                    Agrega más perfiles familiares
                  </p>
                </div>
              </div>
              <Link
                href="#"
                className="group w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                Agregar Nuevo Perfil
              </Link>
            </div>
          </div>
        )}
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
              Experiencia Adaptada para Niños
              <Heart className="w-4 h-4 text-pink-500" />
            </h3>
            <p className="text-slate-700 mb-3 leading-relaxed">
              Tus hijos accederán a <strong>Mundo Interior</strong> a través de
              una plataforma especialmente diseñada para su edad, con interfaces
              amigables, narrativas andinas interactivas y experiencias de
              bienestar emocional adaptadas.
            </p>
            <div className="flex items-center gap-2 text-sm text-indigo-700">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">
                Seguro, educativo y culturalmente relevante
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      {childrenList.length === 0 ? (
        /* Estado vacío */
        <div className="text-center p-12">
          <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              ¡Comienza la aventura emocional!
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Crea el primer perfil para que tu hijo/a pueda explorar sus
              emociones a través de nuestras historias andinas interactivas.
            </p>
            <Link
              href="#"
              className="group inline-flex items-center gap-3 px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Crear Primer Perfil
            </Link>
          </div>
        </div>
      ) : (
        /* Grid de perfiles existentes */
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {childrenList.map((child) => (
            <ExplorerCard key={child.id} child={child} />
          ))}
        </div>
      )}
    </div>
  );
}
