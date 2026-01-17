  "use client";
import { User, Heart, Eye } from "lucide-react";
import Link from "next/link";

export function ExplorerNotFound() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white/90 backdrop-blur-sm border border-red-200 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <User className="w-6 h-6 text-red-700" />
          </div>
          <div>
            <h2 className="mi-text-subtitle text-red-900">
              Explorador no encontrado
            </h2>
            <p className="mi-text-body text-red-700">
              No se encontró información para el explorador seleccionado.
            </p>
          </div>
        </div>
        <Link
          href="/parentDashboard?section=ninos"
          className="group inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <Eye className="w-4 h-4" />
          Volver a mis exploradores
        </Link>
      </div>
    </div>
  );
}

export function NoExplorers() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h2 className="mi-text-title text-slate-800 mb-3">
          ¡Comienza el viaje emocional!
        </h2>
        <p className="mi-text-body text-slate-600 mb-6 leading-relaxed">
          Aún no hay exploradores registrados para ver su bitácora emocional.
          Crea perfiles para comenzar a seguir el crecimiento emocional.
        </p>
        <Link
          href="/parentDashboard?section=ninos"
          className="group inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          <User className="w-5 h-5" />
          Gestionar Mis Exploradores
        </Link>
      </div>
    </div>
  );
}
