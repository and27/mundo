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
}

export function getOpenAIMetricsSnapshot() {
  return {
    total: state.total,
    byType: { ...state.byType },
    byModel: { ...state.byModel },
    entries: state.entries.map((entry) => ({ ...entry })),
  };
}
