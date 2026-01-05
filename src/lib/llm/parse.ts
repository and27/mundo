import { getSchemaForVersion } from "@/lib/llm/registry";

type ParseOk<T> = {
  ok: true;
  data: T;
  schemaVersion: string;
  raw: unknown;
};

type ParseFail = {
  ok: false;
  error: string;
  raw?: unknown;
};

function extractJsonObject(text: string): string | null {
  const match = text.match(/\{[\s\S]*\}/);
  return match ? match[0] : null;
}

export function parseLlmJson<T>(
  rawText: string,
  fallbackSchemaVersion: string
): ParseOk<T> | ParseFail {
  const rawJson = extractJsonObject(rawText);
  if (!rawJson) {
    return { ok: false, error: "No JSON object found in model response." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch (err) {
    return {
      ok: false,
      error: "Failed to parse JSON from model response.",
    };
  }

  const schemaVersion =
    typeof parsed === "object" &&
    parsed !== null &&
    "schema_version" in parsed &&
    typeof (parsed as { schema_version?: unknown }).schema_version === "string"
      ? (parsed as { schema_version: string }).schema_version
      : fallbackSchemaVersion;

  const schema = getSchemaForVersion(schemaVersion);
  if (!schema) {
    return {
      ok: false,
      error: `Unknown schema version: ${schemaVersion}`,
      raw: parsed,
    };
  }

  const result = schema.safeParse(parsed);
  if (!result.success) {
    return {
      ok: false,
      error: result.error.message,
      raw: parsed,
    };
  }

  return {
    ok: true,
    data: result.data as T,
    schemaVersion,
    raw: parsed,
  };
}
