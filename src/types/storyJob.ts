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

export type StoryJobProgress = {
  completed: number;
  total: number;
};

export type StoryJobRequest = {
  emotion: string;
  character: string;
  orientation?: "vertical" | "horizontal";
};

export type StoryJob = {
  id: string;
  userId: string;
  status: StoryJobStatus;
  request: StoryJobRequest;
  progress?: StoryJobProgress | null;
  result?: StoryJobResult | null;
  error?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type StoryJobCreateResponse = {
  jobId: string;
  status: StoryJobStatus;
  statusUrl: string;
  processUrl: string;
};
