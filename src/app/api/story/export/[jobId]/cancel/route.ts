import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/apiAuth";
import { cancelStoryJob, getStoryJob } from "@/lib/storyJobs";

type RouteContext = {
  params: Promise<{ jobId: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { user, error } = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error }, { status: 401 });
  }

  const { jobId } = await context.params;
  const job = await getStoryJob(jobId);
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  if (job.userId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (job.status === "succeeded" || job.status === "failed") {
    return NextResponse.json(
      { error: "Job already finished" },
      { status: 409 }
    );
  }

  const cancelled = await cancelStoryJob(jobId);
  if (!cancelled) {
    return NextResponse.json({ error: "Unable to cancel job" }, { status: 500 });
  }

  return NextResponse.json(cancelled);
}
