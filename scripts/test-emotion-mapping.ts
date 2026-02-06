import { mapEmotionLabel, normalizeText } from "@/lib/emotionMapping";

type TestCase = {
  input: string;
  expected: string | null;
};

const cases: TestCase[] = [
  { input: "ansioso", expected: "miedo" },
  { input: "ansiedad", expected: "miedo" },
  { input: "mi hijo esta ansioso", expected: "miedo" },
  { input: "mi hijo tiene ansiedad", expected: "miedo" },
  { input: "amenazado", expected: "miedo" },
  { input: "frustración", expected: "ira" },
  { input: "agresivo", expected: "ira" },
  { input: "abandonado", expected: "tristeza" },
  { input: "deprimido", expected: "tristeza" },
  { input: "solitario", expected: "tristeza" },
  { input: "vergüenza", expected: "verguenza" },
  { input: "culpa", expected: "verguenza" },
  { input: "celoso", expected: "celos" },
  { input: "envidia", expected: "celos" },
  { input: "alegría", expected: "alegria" },
  { input: "satisfacción", expected: "alegria" },
  { input: "paz", expected: "calma" },
  { input: "compasión", expected: "calma" },
  { input: "serenidad", expected: "calma" },
  { input: "indiferente", expected: "tristeza" },
  { input: "intriga", expected: "miedo" },
  { input: "celo", expected: "celos" },
  { input: "bochorno", expected: "verguenza" },
  { input: "desconcierto", expected: "miedo" },
  { input: "inseguro", expected: "celos" },
  { input: "provocado", expected: "ira" },
  { input: "pavor", expected: "miedo" },
  { input: "remordimiento", expected: "verguenza" },
  { input: "gratitud", expected: "calma" },
  { input: "gozo", expected: "alegria" },
  { input: "vacio", expected: "tristeza" },
];

const failures: string[] = [];

for (const test of cases) {
  const actual = mapEmotionLabel(test.input) ?? null;
  if (actual !== test.expected) {
    failures.push(
      `input="${test.input}" normalized="${normalizeText(test.input)}" expected=${test.expected} actual=${actual}`
    );
  }
}

if (failures.length) {
  console.error("Emotion mapping tests failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Emotion mapping tests passed (${cases.length}).`);
