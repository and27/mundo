import fs from "node:fs";
import path from "node:path";

type OpenAICallType =
  | "chat.completions.create"
  | "images.generate";

type OpenAICallEntry = {
  type: OpenAICallType;
  model?: string;
  label?: string;
  count: number;
};

type OpenAIMetricsState = {
  total: number;
  byType: Record<string, number>;
  byModel: Record<string, number>;
  entries: OpenAICallEntry[];
};

const state: OpenAIMetricsState = {
  total: 0,
  byType: {},
  byModel: {},
  entries: [],
};

const METRICS_PATH = path.join(
  process.cwd(),
  ".local",
  "telemetry",
  "openai-metrics.json"
);

let loadedFromDisk = false;
let pendingWrite = false;
let writeTimer: NodeJS.Timeout | null = null;

function loadFromDisk() {
  if (loadedFromDisk) return;
  loadedFromDisk = true;
  try {
    if (!fs.existsSync(METRICS_PATH)) return;
    const raw = fs.readFileSync(METRICS_PATH, "utf-8");
    const parsed = JSON.parse(raw) as OpenAIMetricsState;
    if (!parsed || typeof parsed !== "object") return;
    state.total = parsed.total ?? state.total;
    state.byType = parsed.byType ?? state.byType;
    state.byModel = parsed.byModel ?? state.byModel;
    state.entries = Array.isArray(parsed.entries) ? parsed.entries : state.entries;
  } catch {
    // ignore disk errors; keep in-memory state
  }
}

function scheduleWrite() {
  if (writeTimer) return;
  writeTimer = setTimeout(() => {
    writeTimer = null;
    if (!pendingWrite) return;
    pendingWrite = false;
    try {
      fs.mkdirSync(path.dirname(METRICS_PATH), { recursive: true });
      fs.writeFileSync(METRICS_PATH, JSON.stringify(state, null, 2), "utf-8");
    } catch {
      // ignore disk errors
    }
  }, 500);
}

function findEntry(
  type: OpenAICallType,
  model?: string,
  label?: string
): OpenAICallEntry | null {
  return (
    state.entries.find(
      (entry) =>
        entry.type === type &&
        entry.model === model &&
        entry.label === label
    ) ?? null
  );
}

export function recordOpenAICall(
  type: OpenAICallType,
  options: { model?: string; label?: string } = {}
) {
  loadFromDisk();
  state.total += 1;
  state.byType[type] = (state.byType[type] ?? 0) + 1;
  if (options.model) {
    state.byModel[options.model] = (state.byModel[options.model] ?? 0) + 1;
  }
  const entry =
    findEntry(type, options.model, options.label) ??
    (() => {
      const created: OpenAICallEntry = {
        type,
        model: options.model,
        label: options.label,
        count: 0,
      };
      state.entries.push(created);
      return created;
    })();
  entry.count += 1;
  pendingWrite = true;
  scheduleWrite();
}

export function getOpenAIMetricsSnapshot() {
  loadFromDisk();
  return {
    total: state.total,
    byType: { ...state.byType },
    byModel: { ...state.byModel },
    entries: state.entries.map((entry) => ({ ...entry })),
  };
}
