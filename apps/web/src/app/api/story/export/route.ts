import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/apiAuth";
import { createStoryJob, processStoryJob } from "@/lib/storyJobs";

export async function POST(request: Request) {
  const { user, error } = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error }, { status: 401 });
  }

  const body = await request.json();
  const { emotion, character, orientation } = body;

  if (!emotion || !character) {
    return NextResponse.json(
      { error: "emotion y character son requeridos." },
      { status: 400 }
    );
  }

  const normalizedOrientation =
    orientation === "horizontal" || orientation === "vertical"
      ? orientation
      : undefined;

  const job = await createStoryJob(user.id, {
    emotion,
    character,
    orientation: normalizedOrientation,
  });

  void processStoryJob(job.id).catch((err) => {
    console.error("[story/export] Background job failed:", err);
  });

  return NextResponse.json(
    {
      jobId: job.id,
      status: job.status,
      statusUrl: `/api/story/export/${job.id}`,
      processUrl: `/api/story/export/${job.id}/process`,
    },
    { status: 202 }
  );
}
