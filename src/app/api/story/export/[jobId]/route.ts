import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/apiAuth";
import { getStoryJob } from "@/lib/storyJobs";

type RouteContext = {
  params: { jobId: string };
};

export async function GET(request: Request, context: RouteContext) {
  const { user, error } = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error }, { status: 401 });
  }

  const job = await getStoryJob(context.params.jobId);
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  if (job.userId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json(job);
}
