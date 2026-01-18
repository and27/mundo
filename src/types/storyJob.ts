export type StoryJobStatus = "queued" | "running" | "succeeded" | "failed";

export type StoryJobResult = {
  storyId: string;
  url?: string;
  cached: boolean;
};

export type StoryJob = {
  id: string;
  status: StoryJobStatus;
  result?: StoryJobResult | null;
  error?: string | null;
};

export type StoryJobCreateResponse = {
  jobId: string;
  status: StoryJobStatus;
  statusUrl: string;
  processUrl: string;
};
