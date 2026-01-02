import { supabase } from "@/lib/supabaseServer";

export type ApiAuthResult = {
  user: { id: string } | null;
  error: string | null;
};

export const getAuthUser = async (request: Request): Promise<ApiAuthResult> => {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : "";

  if (!token) {
    return { user: null, error: "Missing auth token" };
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    return { user: null, error: "Invalid auth token" };
  }

  return { user: { id: data.user.id }, error: null };
};
