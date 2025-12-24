import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseServer";
import { GuideWithCharacter } from "@/types/ai";

type SaveGuidePayload = {
  userId: string;
  guide: GuideWithCharacter;
};

type DeleteGuidePayload = {
  userId: string;
  storyId: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("saved_guides")
    .select("*")
    .eq("user_id", userId)
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
  const body = (await request.json()) as SaveGuidePayload;
  const { userId, guide } = body;

  if (!userId || !guide) {
    return NextResponse.json(
      { error: "userId and guide are required" },
      { status: 400 }
    );
  }

  const bucketName = "stories";
  const storagePath = `guides/${userId}/${guide.id}.json`;

  const uploadRes = await supabase.storage
    .from(bucketName)
    .upload(storagePath, JSON.stringify(guide, null, 2), {
      contentType: "application/json",
      upsert: true,
    });

  if (uploadRes.error) {
    return NextResponse.json({ error: uploadRes.error.message }, { status: 500 });
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(storagePath);
  const storyUrl = publicUrlData?.publicUrl;

  const { data: existing, error: findError } = await supabase
    .from("saved_guides")
    .select("id")
    .eq("user_id", userId)
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
        character: guide.character,
        guide_id: guide.character,
        story_url: storyUrl,
      })
      .eq("id", existing.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }
  } else {
    const { error: insertError } = await supabase.from("saved_guides").insert({
      user_id: userId,
      story_id: guide.id,
      story_url: storyUrl,
      title: guide.guideTitle,
      guide_id: guide.character,
      emotion: guide.emotion,
      character: guide.character,
    });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
  }

  const { data: savedRow, error: readError } = await supabase
    .from("saved_guides")
    .select("created_at")
    .eq("user_id", userId)
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
  const body = (await request.json()) as DeleteGuidePayload;
  const { userId, storyId } = body;

  if (!userId || !storyId) {
    return NextResponse.json(
      { error: "userId and storyId are required" },
      { status: 400 }
    );
  }

  const { data: existing, error: findError } = await supabase
    .from("saved_guides")
    .select("story_url")
    .eq("user_id", userId)
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
    .eq("user_id", userId)
    .eq("story_id", storyId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
