import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/apiAuth";
import { getStoryJob, processStoryJob } from "@/lib/storyJobs";

type RouteContext = {
  params: { jobId: string };
};

export async function POST(request: Request, context: RouteContext) {
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

  if (job.status === "running") {
    return NextResponse.json(job, { status: 202 });
  }

  if (job.status === "succeeded") {
    return NextResponse.json(job, { status: 200 });
  }

  void processStoryJob(job.id).catch((err) => {
    console.error("[story/export] Process job failed:", err);
  });

  return NextResponse.json(
    { ...job, status: "running" },
    { status: 202 }
  );
}
