type RateLimitEntry = {
  count: number;
  resetAt: number;
};

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetAt: number;
  limit: number;
};

const store = new Map<string, RateLimitEntry>();

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const safeWindowMs = Math.max(windowMs, 1000);
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    const resetAt = now + safeWindowMs;
    store.set(key, { count: 1, resetAt });
    return { ok: true, remaining: Math.max(limit - 1, 0), resetAt, limit };
  }

  if (entry.count >= limit) {
    return { ok: false, remaining: 0, resetAt: entry.resetAt, limit };
  }

  entry.count += 1;
  store.set(key, entry);
  return {
    ok: true,
    remaining: Math.max(limit - entry.count, 0),
    resetAt: entry.resetAt,
    limit,
  };
}

export function buildRateLimitHeaders(
  result: RateLimitResult
): Record<string, string> {
  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
  };
}
