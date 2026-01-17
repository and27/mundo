import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Mail, User } from "lucide-react";
import { logoutUser } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { useOnboardingStore } from "@/store/useOnboardingStore";

export default function SettingsSection() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const showSubtitles = useOnboardingStore((state) => state.showSubtitles);
  const toggleSubtitles = useOnboardingStore((state) => state.toggleSubtitles);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const displayName = useMemo(
    () => user?.displayName || user?.email || "Explorador",
    [user]
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
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="mi-text-title text-neutral-800">Ajustes</h2>
        <p className="mi-text-body text-neutral-600">
          Configura tu perfil, preferencias y opciones de seguridad.
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
                Datos principales de la cuenta.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="mi-text-body-sm text-neutral-500">Nombre</span>
              <span className="mi-text-body text-neutral-700">
                {displayName}
              </span>
            </div>
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
          {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
        </button>
      </section>
    </div>
  );
}
