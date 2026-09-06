import "server-only";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    "CRITICAL ERROR: Missing Supabase URL or Service Role Key. Application cannot start properly."
  );
  throw new Error(
    "Missing Supabase URL or Service Role Key. Check your environment variables."
  );
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Cliente aislado para operaciones de sesion (login, refresh): no comparte el estado
// de auth del cliente singleton, que atiende peticiones de todos los usuarios.
export const createAuthClient = () =>
  createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
