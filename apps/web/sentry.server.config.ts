// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const tracesSampleRate = Number(
  process.env.SENTRY_TRACES_SAMPLE_RATE ?? 0.1
);

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: Number.isFinite(tracesSampleRate)
    ? tracesSampleRate
    : 0.1,

  // Avoid sending PII by default; enable explicitly if needed.
  sendDefaultPii: false,
});
