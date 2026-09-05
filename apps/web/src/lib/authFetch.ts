import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

type AuthFetchOptions = RequestInit & {
  requireAuth?: boolean;
};

// Una sola renovacion en vuelo: si varias peticiones reciben 401 a la vez,
// todas esperan al mismo /api/refresh en lugar de dispararlo N veces.
let refreshInFlight: Promise<boolean> | null = null;

async function refreshSession(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = fetch("/api/refresh", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.ok)
      .catch(() => false)
      .finally(() => {
        refreshInFlight = null;
      });
  }
  return refreshInFlight;
}

export async function authFetch(
  input: RequestInfo | URL,
  init: AuthFetchOptions = {}
): Promise<Response> {
  const { requireAuth = true, ...rest } = init;
  const { clearUser } = useAuthStore.getState();
  const headers = new Headers(rest.headers || {});

  const send = () =>
    fetch(input, {
      ...rest,
      headers,
      credentials: "include",
    });

  let response = await send();

  if (response.status === 401 && requireAuth) {
    // El access token dura una hora; antes de expulsar, se intenta renovarlo
    // con el refresh token y repetir la peticion una sola vez.
    const refreshed = await refreshSession();
    if (refreshed) {
      response = await send();
    }
  }

  if (response.status === 401 && requireAuth) {
    clearUser();
    toast.error("Sesion expirada. Inicia sesion nuevamente.");
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (path !== "/register") {
        window.location.href = "/register?tab=login";
      }
    }
  }

  return response;
}
