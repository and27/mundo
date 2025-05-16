import { supabase } from "./supabaseServer";

interface FacilitatorProfileData {
  id: string;
  email: string;
  role?: string;
}

export async function createFacilitatorProfile(
  profileData: FacilitatorProfileData
) {
  const { data, error } = await supabase
    .from("profiles")
    .insert([
      {
        id: profileData.id,
        email: profileData.email,
        role: profileData.role || "parent",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) {
    console.error("SupabaseUtil - createFacilitatorProfile error:", error);
    return { data: null, error };
  }

  return { data: data ? data[0] : null, error: null };
}
