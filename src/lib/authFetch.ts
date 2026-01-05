import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

type AuthFetchOptions = RequestInit & {
  requireAuth?: boolean;
};

export async function authFetch(
  input: RequestInfo | URL,
  init: AuthFetchOptions = {}
): Promise<Response> {
  const { requireAuth = true, ...rest } = init;
  const { user, clearUser } = useAuthStore.getState();
  const headers = new Headers(rest.headers || {});

  if (user?.accessToken) {
    headers.set("Authorization", `Bearer ${user.accessToken}`);
  }

  const response = await fetch(input, { ...rest, headers });

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
