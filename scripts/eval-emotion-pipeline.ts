import fs from "node:fs";
import path from "node:path";
import { mapEmotionLabel } from "@/lib/emotionMapping";
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
  source: "keyword" | "classifier";
  confidence?: number;
};

const casesPath = path.join(
  process.cwd(),
  "scripts",
  "emotion-pipeline-cases.json"
);

const raw = fs.readFileSync(casesPath, "utf8");
const cases = JSON.parse(raw) as Case[];

const timeoutMs = Number(process.env.EVAL_TIMEOUT_MS ?? 15000);
const maxCases = Number(process.env.EVAL_MAX_CASES ?? cases.length);

const selected = cases.slice(0, maxCases);
const results: Result[] = [];

for (const test of selected) {
  const keywordMatch = mapEmotionLabel(test.input);
  if (keywordMatch) {
    results.push({
      input: test.input,
      expected: test.expected,
      actual: keywordMatch,
      source: "keyword",
    });
    continue;
  }

  const classified = await classifyEmotionLabel(test.input, timeoutMs);
  results.push({
    input: test.input,
    expected: test.expected,
    actual: classified?.emotion ?? null,
    source: "classifier",
    confidence: classified?.confidence,
  });
}

let correct = 0;
let keywordCorrect = 0;
let keywordTotal = 0;
let classifierCorrect = 0;
let classifierTotal = 0;
const failures: Result[] = [];

for (const result of results) {
  if (result.source === "keyword") {
    keywordTotal += 1;
  } else {
    classifierTotal += 1;
  }

  if (result.actual === result.expected) {
    correct += 1;
    if (result.source === "keyword") keywordCorrect += 1;
    else classifierCorrect += 1;
  } else {
    failures.push(result);
  }
}

const accuracy = results.length
  ? (correct / results.length) * 100
  : 0;
const keywordAccuracy = keywordTotal
  ? (keywordCorrect / keywordTotal) * 100
  : 0;
const classifierAccuracy = classifierTotal
  ? (classifierCorrect / classifierTotal) * 100
  : 0;

console.log(`Emotion pipeline eval (${results.length} cases)`);
console.log(`Overall accuracy: ${accuracy.toFixed(1)}% (${correct}/${results.length})`);
console.log(
  `Keyword accuracy: ${keywordAccuracy.toFixed(1)}% (${keywordCorrect}/${keywordTotal})`
);
console.log(
  `Classifier accuracy: ${classifierAccuracy.toFixed(1)}% (${classifierCorrect}/${classifierTotal})`
);

if (failures.length) {
  console.log("Failures:");
  for (const failure of failures) {
    console.log(
      `- expected=${failure.expected} actual=${failure.actual} source=${failure.source} confidence=${failure.confidence ?? "n/a"} input="${failure.input}"`
    );
  }
  process.exit(1);
}
