import fs from "node:fs";
import path from "node:path";
import { classifyEmotionLabel } from "@/lib/llm/emotionClassifier";
import type { EmotionId } from "@/types/ai";

type Case = {
  input: string;
  expected: EmotionId;
};

type Result = {
  input: string;
  expected: EmotionId;
  actual: EmotionId | null;
  confidence?: number;
};

const casesPath = path.join(
  process.cwd(),
  "scripts",
  "emotion-classifier-cases.json"
);

async function main() {
  const raw = fs.readFileSync(casesPath, "utf8");
  const cases = JSON.parse(raw) as Case[];

  const timeoutMs = Number(process.env.EVAL_TIMEOUT_MS ?? 15000);
  const maxCases = Number(process.env.EVAL_MAX_CASES ?? cases.length);

  const selected = cases.slice(0, maxCases);
  const results: Result[] = [];

  for (const test of selected) {
    const classified = await classifyEmotionLabel(test.input, timeoutMs);
    results.push({
      input: test.input,
      expected: test.expected,
      actual: classified?.emotion ?? null,
      confidence: classified?.confidence,
    });
  }

  let correct = 0;
  const failures: Result[] = [];

  for (const result of results) {
    if (result.actual === result.expected) {
      correct += 1;
    } else {
      failures.push(result);
    }
  }

  const accuracy = results.length
    ? (correct / results.length) * 100
    : 0;

  console.log(`Emotion classifier eval (${results.length} cases)`);
  console.log(
    `Accuracy: ${accuracy.toFixed(1)}% (${correct}/${results.length})`
  );

  if (failures.length) {
    console.log("Failures:");
    for (const failure of failures) {
      console.log(
        `- expected=${failure.expected} actual=${failure.actual} confidence=${failure.confidence ?? "n/a"} input="${failure.input}"`
      );
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Emotion classifier eval failed:", error);
  process.exit(1);
});
