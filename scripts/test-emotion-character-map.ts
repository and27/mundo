import { getDefaultCharacterForEmotion } from "@/lib/emotionCharacterMap";
import type { EmotionId } from "@/types/ai";

type TestCase = {
  emotion: EmotionId;
  expected: string;
};

const cases: TestCase[] = [
  { emotion: "miedo", expected: "yachay" },
  { emotion: "ira", expected: "amaru" },
  { emotion: "tristeza", expected: "kuntur" },
  { emotion: "verguenza", expected: "kuntur" },
  { emotion: "celos", expected: "amaru" },
  { emotion: "alegria", expected: "pajaro" },
  { emotion: "calma", expected: "hatun" },
];

const failures: string[] = [];

for (const test of cases) {
  const actual = getDefaultCharacterForEmotion(test.emotion);
  if (actual !== test.expected) {
    failures.push(
      `emotion="${test.emotion}" expected=${test.expected} actual=${actual}`
    );
  }
}

if (failures.length) {
  console.error("Emotion->character mapping tests failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Emotion->character mapping tests passed (${cases.length}).`);
