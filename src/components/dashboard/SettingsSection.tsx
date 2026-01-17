import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, Mail, User, Wand2, BookOpenCheck, Sparkles } from "lucide-react";
import { logoutUser } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { useOnboardingStore } from "@/store/useOnboardingStore";

export default function SettingsSection() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const name = useOnboardingStore((state) => state.name);
  const setName = useOnboardingStore((state) => state.setName);
  const showSubtitles = useOnboardingStore((state) => state.showSubtitles);
  const toggleSubtitles = useOnboardingStore((state) => state.toggleSubtitles);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const displayName = useMemo(
    () => name || user?.displayName || user?.email || "Explorador",
    [name, user]
  );

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutUser();
      clearUser();
      router.push("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="max-w-4xl px-5 md:px-20 mi-stack-md">
      <header className="mi-section-header">
        <h1 className="mi-text-title-lg text-neutral-800 mi-section-title">
          Ajustes
        </h1>
        <p className="mi-text-body text-neutral-600">
          Configura tu perfil, personaliza la experiencia y gestiona tu cuenta.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
              <User className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <h3 className="mi-text-subtitle text-neutral-800">Perfil</h3>
              <p className="mi-text-body-sm text-neutral-500">
                Personaliza los datos principales.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="space-y-1 block">
              <span className="mi-text-body-sm text-neutral-500">Nombre</span>
              <input
                value={displayName}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-neutral-200 px-3 py-2 mi-text-body text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-200"
                placeholder="Escribe tu nombre"
              />
            </label>
            <div className="flex items-center justify-between">
              <span className="mi-text-body-sm text-neutral-500">Correo</span>
              <span className="mi-text-body text-neutral-700">
                {user?.email ?? "Sin correo"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
              <Mail className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <h3 className="mi-text-subtitle text-neutral-800">
                Preferencias
              </h3>
              <p className="mi-text-body-sm text-neutral-500">
                Ajustes de la experiencia.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-xl border border-neutral-200 p-4">
            <div>
              <p className="mi-text-label text-neutral-700">Subtítulos</p>
              <p className="mi-text-body-sm text-neutral-500">
                Mostrar texto durante los cuentos.
              </p>
            </div>
            <button
              type="button"
              onClick={toggleSubtitles}
              className={`px-4 py-2 rounded-full mi-text-label transition ${
                showSubtitles
                  ? "bg-green-500 text-white"
                  : "bg-neutral-100 text-neutral-500"
              }`}
            >
              {showSubtitles ? "Activado" : "Desactivado"}
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="mi-text-subtitle text-neutral-800">
              Accesos rapidos
            </h3>
            <p className="mi-text-body-sm text-neutral-500">
              Atajos a las secciones principales.
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/parentDashboard?section=program"
            className="flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-3 mi-text-label text-neutral-700 hover:border-neutral-300 hover:shadow-sm transition"
          >
            <BookOpenCheck className="w-4 h-4 text-neutral-500" />
            Emociones en accion
          </Link>
          <Link
            href="/parentDashboard?section=asistente"
            className="flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-3 mi-text-label text-neutral-700 hover:border-neutral-300 hover:shadow-sm transition"
          >
            <Sparkles className="w-4 h-4 text-neutral-500" />
            Crear cuento
          </Link>
          <Link
            href="/parentDashboard?section=guides"
            className="flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-3 mi-text-label text-neutral-700 hover:border-neutral-300 hover:shadow-sm transition"
          >
            <Wand2 className="w-4 h-4 text-neutral-500" />
            Mis cuentos
          </Link>
        </div>
      </section>

      <section className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-4">
        <h3 className="mi-text-subtitle text-neutral-800">Seguridad</h3>
        <p className="mi-text-body-sm text-neutral-600">
          Controla el acceso a tu cuenta.
        </p>
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl mi-text-label transition ${
            isLoggingOut
              ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
              : "bg-red-50 text-red-600 hover:bg-red-100"
          }`}
        >
          <LogOut className="w-4 h-4" />
          {isLoggingOut ? "Cerrando sesion..." : "Cerrar sesion"}
        </button>
      </section>
    </div>
  );
}
