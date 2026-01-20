import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseServer";
import { GuideWithCharacter } from "@/types/ai";
import { getAuthUser } from "@/lib/apiAuth";

type DeleteGuidePayload = {
  storyId: string;
};

 

export async function GET(request: Request) {
  const { user, error: authError } = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("saved_guides")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching saved guides:", error);
    return NextResponse.json(
      { error: "No se pudo cargar tus cuentos." },
      { status: 500 }
    );
  }

  const items: { guide: GuideWithCharacter; createdAt: string | null }[] = [];
  for (const row of data || []) {
    if (!row.story_url) {
      continue;
    }
    try {
      const res = await fetch(row.story_url);
      if (!res.ok) {
        continue;
      }
      const guide = (await res.json()) as GuideWithCharacter;
      items.push({ guide, createdAt: row.created_at ?? null });
    } catch (err) {
      console.error("Error loading guide JSON:", err);
    }
  }

  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const { user, error } = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const body = (await request.json()) as { guide?: GuideWithCharacter };
  const { guide } = body;

  if (!guide) {
    return NextResponse.json(
      { error: "Se requiere una guia para guardar." },
      { status: 400 }
    );
  }

  const bucketName = "stories";
  const storagePath = `guides/${user.id}/${guide.id}.json`;

  const uploadRes = await supabase.storage
    .from(bucketName)
    .upload(storagePath, JSON.stringify(guide, null, 2), {
      contentType: "application/json",
      upsert: true,
    });

  if (uploadRes.error) {
    console.error("Error uploading guide JSON:", uploadRes.error);
    return NextResponse.json(
      { error: "No se pudo guardar el cuento." },
      { status: 500 }
    );
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(storagePath);
  const storyUrl = publicUrlData?.publicUrl;

  const { data: existing, error: findError } = await supabase
    .from("saved_guides")
    .select("id")
    .eq("user_id", user.id)
    .eq("story_id", guide.id)
    .maybeSingle();

  if (findError) {
    console.error("Error checking saved guide:", findError);
    return NextResponse.json(
      { error: "No se pudo guardar el cuento." },
      { status: 500 }
    );
  }

  if (existing?.id) {
    const { error: updateError } = await supabase
      .from("saved_guides")
      .update({
        title: guide.guideTitle,
        emotion: guide.emotionId,
        character: guide.characterId,
        guide_id: guide.characterId,
        story_url: storyUrl,
      })
      .eq("id", existing.id);

    if (updateError) {
      console.error("Error updating saved guide:", updateError);
      return NextResponse.json(
        { error: "No se pudo guardar el cuento." },
        { status: 500 }
      );
    }
  } else {
    const { error: insertError } = await supabase.from("saved_guides").insert({
      user_id: user.id,
      story_id: guide.id,
      story_url: storyUrl,
      title: guide.guideTitle,
      guide_id: guide.characterId,
      emotion: guide.emotionId,
      character: guide.characterId,
    });

    if (insertError) {
      console.error("Error inserting saved guide:", insertError);
      return NextResponse.json(
        { error: "No se pudo guardar el cuento." },
        { status: 500 }
      );
    }
  }

  const { data: savedRow, error: readError } = await supabase
    .from("saved_guides")
    .select("created_at")
    .eq("user_id", user.id)
    .eq("story_id", guide.id)
    .maybeSingle();

  if (readError) {
    console.error("Error reading saved guide:", readError);
    return NextResponse.json(
      { error: "No se pudo guardar el cuento." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    guide,
    createdAt: savedRow?.created_at ?? null,
  });
}

export async function DELETE(request: Request) {
  const { user, error: authError } = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const body = (await request.json()) as DeleteGuidePayload;
  const { storyId } = body;

  if (!storyId) {
    return NextResponse.json(
      { error: "Falta el identificador del cuento." },
      { status: 400 }
    );
  }

  const { data: existing, error: findError } = await supabase
    .from("saved_guides")
    .select("story_url")
    .eq("user_id", user.id)
    .eq("story_id", storyId)
    .maybeSingle();

  if (findError) {
    console.error("Error finding saved guide:", findError);
    return NextResponse.json(
      { error: "No se pudo eliminar el cuento." },
      { status: 500 }
    );
  }

  if (existing?.story_url) {
    const url = new URL(existing.story_url);
    const marker = "/stories/";
    const markerIndex = url.pathname.indexOf(marker);
    if (markerIndex !== -1) {
      const path = url.pathname.slice(markerIndex + marker.length);
      const { error: storageError } = await supabase.storage
        .from("stories")
        .remove([path]);
      if (storageError) {
        console.error("Error removing guide from storage:", storageError);
        return NextResponse.json(
          { error: "No se pudo eliminar el cuento." },
          { status: 500 }
        );
      }
    }
  }

  const { error } = await supabase
    .from("saved_guides")
    .delete()
    .eq("user_id", user.id)
    .eq("story_id", storyId);

  if (error) {
    console.error("Error deleting saved guide:", error);
    return NextResponse.json(
      { error: "No se pudo eliminar el cuento." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
