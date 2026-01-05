# LLM Schema Guide (Parent Guide)

This project uses explicit schemas for LLM outputs. The goal is to keep the
runtime model stable while allowing the LLM output shape to evolve safely.

## Current output contract

Parent guide output is versioned and validated with Zod.

- Schema: `src/schemas/parentGuide.v2.ts`
- Registry: `src/lib/llm/registry.ts`
- Parse: `src/lib/llm/parse.ts`
- Normalize to runtime: `src/lib/llm/normalize/parentGuide.ts`
- Prompt (current): `src/lib/prompts/v2.ts`
- Prompt (legacy): `src/lib/prompts/v1_3pillars.ts`

The API route `src/app/api/generate-guide/route.ts`:
- calls the LLM,
- parses JSON with `parseLlmJson`,
- normalizes to the stable runtime model,
- returns `_metadata.schemaVersion`.

## How to change the prompt output

1) Add a new schema file
   - Example: `src/schemas/parentGuide.v3.ts`
   - Use Zod and keep fields required where possible.
   - Add a `schema_version` literal (e.g. `"parent_guide.v3"`).

2) Register the new schema
   - Update `src/lib/llm/registry.ts` with the new version.

3) Update the prompt
   - File: `src/lib/prompts/v2.ts`
   - Require `schema_version` to match the new version.
   - Describe the required fields and section kinds.

4) Update normalization
   - File: `src/lib/llm/normalize/parentGuide.ts`
   - Map the new output shape to the stable runtime model.

5) Update API fallback
   - File: `src/app/api/generate-guide/route.ts`
   - Use the new version as the `parseLlmJson` fallback.

## Parent guide output v2 (sections)

The LLM must return:

```json
{
  "schema_version": "parent_guide.v2",
  "id": "string",
  "guideTitle": "string",
  "emotion": "miedo",
  "tags": ["string"],
  "sections": [
    { "kind": "metaphor", "title": "...", "content": "..." },
    { "kind": "language", "title": "...", "phrases": ["..."], "questions": ["..."] },
    { "kind": "practice", "title": "...", "description": "...", "materials": "..." }
  ],
  "riskAssessment": {
    "riskLevel": "normal",
    "confidence": 0.7,
    "reasoning": "..."
  }
}
```

Required section kinds:
- `metaphor`
- `language`
- `practice`

Optional section kinds:
- `understanding`
- `normalization`
- `strategies`
- `reflection`
- `notes`

## Runtime model stability

UI code should depend on the runtime model (`ActionableGuide`) and not on the
raw LLM output. When the prompt changes, only the schema and normalizer should
need updates.
