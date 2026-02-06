# Core Boundary Plan (Phase 1)

## Goal
Extract a reusable core domain package that is framework-agnostic (no Next/React),
to be shared by web (and future mobile) clients.

## Core Candidates (Move to `packages/core`)
- Emotion utilities
  - `src/lib/emotionMapping.ts`
  - `src/lib/emotionCharacterMap.ts`
- Guide inference
  - `src/lib/guideInference.ts`
- Prompt templates (pure strings)
  - `src/lib/prompts/*`
- Domain types/models
  - `src/types/ai.ts`
  - `src/types/storyJob.ts`
  - `src/types/program.ts`

## Server-only (Stay in web/API layer)
- Next API routes (`src/app/api/*`)
- Supabase server helpers (`src/lib/supabaseServer.ts`)
- Story job orchestration (`src/lib/storyJobs.ts`)
- Story export + storage (`src/lib/storyExport.ts`)
- Auth utilities (`src/lib/apiAuth.ts`, `src/lib/authFetch.ts`)

## Web-only (Stay in apps/web)
- React components (`src/components/*`)
- Next pages/layout (`src/app/*`)
- Client hooks and stores

## Notes
- Core must not import `next/*`, `react`, or server-only modules.
- Core should expose pure functions and types only.
- Web app will import core via `@mundo/core` (workspace alias).

## Next Steps (Phase 2)
1. Create `packages/core` with `package.json` and TS config.
2. Move 2–3 core modules first to validate build.
3. Update web imports to use core package.
