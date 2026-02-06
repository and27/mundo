import { supabase } from "@/lib/supabaseServer";
import { ACCESS_TOKEN_COOKIE, getCookieValue } from "@/lib/authCookies";

export type ApiAuthResult = {
  user: { id: string } | null;
  error: string | null;
};

export const getAuthUser = async (request: Request): Promise<ApiAuthResult> => {
  const authHeader = request.headers.get("authorization") || "";
  let token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : "";

  if (!token) {
    const cookieHeader = request.headers.get("cookie");
    token = getCookieValue(cookieHeader, ACCESS_TOKEN_COOKIE) ?? "";
  }

  if (!token) {
    return { user: null, error: "Missing auth token" };
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    return { user: null, error: "Invalid auth token" };
  }

  return { user: { id: data.user.id }, error: null };
};
