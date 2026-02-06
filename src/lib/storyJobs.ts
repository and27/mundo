import "server-only";

import { randomUUID } from "node:crypto";
import { supabase } from "@/lib/supabaseServer";
import {
  generateStoryExport,
  type StoryExportRequest,
  CANCELLED_JOB_ERROR,
} from "@/lib/storyExport";

export type StoryJobStatus =
  | "queued"
  | "running"
  | "succeeded"
  | "failed"
  | "cancelled";

export type StoryJobResult = {
  storyId: string;
  url?: string;
  cached: boolean;
};

export type StoryJob = {
  id: string;
  userId: string;
  status: StoryJobStatus;
  request: StoryExportRequest;
  result?: StoryJobResult | null;
  error?: string | null;
  createdAt: string;
  updatedAt: string;
};

type StoryJobUpdate = {
  status?: StoryJobStatus;
  result?: StoryJobResult | null;
  error?: string | null;
};

const JOB_BUCKET = "stories";
const JOB_PREFIX = "jobs";

const jobPath = (jobId: string) => `${JOB_PREFIX}/${jobId}.json`;

async function writeJob(job: StoryJob): Promise<void> {
  const { error } = await supabase.storage
    .from(JOB_BUCKET)
    .upload(jobPath(job.id), JSON.stringify(job, null, 2), {
      contentType: "application/json",
      upsert: true,
    });

  if (error) {
    throw new Error(`Failed to store job: ${error.message}`);
  }
}

export async function createStoryJob(
  userId: string,
  request: StoryExportRequest
): Promise<StoryJob> {
  const now = new Date().toISOString();
  const job: StoryJob = {
    id: randomUUID(),
    userId,
    status: "queued",
    request,
    createdAt: now,
    updatedAt: now,
  };

  await writeJob(job);
  return job;
}

export async function getStoryJob(jobId: string): Promise<StoryJob | null> {
  try {
    const { data, error } = await supabase.storage
      .from(JOB_BUCKET)
      .download(jobPath(jobId));

    if (error) {
      return null;
    }

    const text = await data.text();
    return JSON.parse(text) as StoryJob;
  } catch (error) {
    console.error("Failed to read job:", error);
    return null;
  }
}

export async function updateStoryJob(
  jobId: string,
  update: StoryJobUpdate
): Promise<StoryJob | null> {
  const job = await getStoryJob(jobId);
  if (!job) return null;

  const nextJob: StoryJob = {
    ...job,
    status: update.status ?? job.status,
    updatedAt: new Date().toISOString(),
  };

  if ("result" in update) {
    nextJob.result = update.result ?? null;
  }

  if ("error" in update) {
    nextJob.error = update.error ?? null;
  }

  await writeJob(nextJob);
  return nextJob;
}

export async function cancelStoryJob(
  jobId: string
): Promise<StoryJob | null> {
  const job = await getStoryJob(jobId);
  if (!job) return null;
  if (job.status === "succeeded" || job.status === "failed") {
    return job;
  }

  return await updateStoryJob(jobId, { status: "cancelled", error: null });
}

export async function processStoryJob(
  jobId: string
): Promise<StoryJob | null> {
  const job = await getStoryJob(jobId);
  if (!job) return null;
  if (
    job.status === "running" ||
    job.status === "succeeded" ||
    job.status === "cancelled"
  ) {
    return job;
  }

  await updateStoryJob(jobId, { status: "running", error: null });

  try {
    const result = await generateStoryExport(job.request, {
      shouldCancel: async () => {
        const latest = await getStoryJob(jobId);
        return latest?.status === "cancelled";
      },
    });
    return await updateStoryJob(jobId, {
      status: "succeeded",
      result: {
        storyId: result.story.id,
        url: result.url,
        cached: result.cached,
      },
      error: null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message === CANCELLED_JOB_ERROR) {
      return await updateStoryJob(jobId, {
        status: "cancelled",
        error: null,
      });
    }
    console.error("Story job failed:", error);
    return await updateStoryJob(jobId, {
      status: "failed",
      error: message,
    });
  }
}
