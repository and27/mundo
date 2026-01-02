import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseServer";
import { GuideWithCharacter } from "@/types/ai";

type DeleteGuidePayload = {
  storyId: string;
};

const getAuthUser = async (request: Request) => {
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

  return { user: data.user, error: null };
};

export async function GET(request: Request) {
  const { user, error: authError } = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ authError }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("saved_guides")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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
    return NextResponse.json({ error }, { status: 401 });
  }

  const body = (await request.json()) as { guide?: GuideWithCharacter };
  const { guide } = body;

  if (!guide) {
    return NextResponse.json({ error: "guide is required" }, { status: 400 });
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
    return NextResponse.json(
      { error: uploadRes.error.message },
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
    return NextResponse.json({ error: findError.message }, { status: 500 });
  }

  if (existing?.id) {
    const { error: updateError } = await supabase
      .from("saved_guides")
      .update({
        title: guide.guideTitle,
        emotion: guide.emotion,
        character: guide.characterId,
        guide_id: guide.characterId,
        story_url: storyUrl,
      })
      .eq("id", existing.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }
  } else {
    const { error: insertError } = await supabase.from("saved_guides").insert({
      user_id: user.id,
      story_id: guide.id,
      story_url: storyUrl,
      title: guide.guideTitle,
      guide_id: guide.characterId,
      emotion: guide.emotion,
      character: guide.characterId,
    });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
  }

  const { data: savedRow, error: readError } = await supabase
    .from("saved_guides")
    .select("created_at")
    .eq("user_id", user.id)
    .eq("story_id", guide.id)
    .maybeSingle();

  if (readError) {
    return NextResponse.json({ error: readError.message }, { status: 500 });
  }

  return NextResponse.json({
    guide,
    createdAt: savedRow?.created_at ?? null,
  });
}

export async function DELETE(request: Request) {
  const { user, error: authError } = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ authError }, { status: 401 });
  }

  const body = (await request.json()) as DeleteGuidePayload;
  const { storyId } = body;

  if (!storyId) {
    return NextResponse.json({ error: "storyId is required" }, { status: 400 });
  }

  const { data: existing, error: findError } = await supabase
    .from("saved_guides")
    .select("story_url")
    .eq("user_id", user.id)
    .eq("story_id", storyId)
    .maybeSingle();

  if (findError) {
    return NextResponse.json({ error: findError.message }, { status: 500 });
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
        return NextResponse.json(
          { error: storageError.message },
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
