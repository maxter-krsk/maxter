const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  retryAfter: number;
};

const globalForRateLimit = globalThis as typeof globalThis & {
  maxterLeadRateLimit?: Map<string, RateLimitEntry>;
};

const rateLimitStore =
  globalForRateLimit.maxterLeadRateLimit ?? new Map<string, RateLimitEntry>();

globalForRateLimit.maxterLeadRateLimit = rateLimitStore;

function clearExpiredEntries(now: number) {
  if (rateLimitStore.size < 500) return;

  for (const [key, entry] of rateLimitStore) {
    if (entry.resetAt <= now) rateLimitStore.delete(key);
  }

  if (rateLimitStore.size < 10_000) return;

  const oldestKeys = Array.from(rateLimitStore.keys()).slice(0, 1_000);
  for (const key of oldestKeys) rateLimitStore.delete(key);
}

export function checkLeadRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  clearExpiredEntries(now);

  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW,
    });

    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  rateLimitStore.set(key, current);

  return { allowed: true, retryAfter: 0 };
}
