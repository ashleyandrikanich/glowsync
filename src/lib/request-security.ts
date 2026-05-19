import { NextResponse } from "next/server";

type RateBucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateBucket>();

export const REQUEST_LIMITS = {
  emailMax: 254,
  passwordMax: 128,
  nameMax: 80,
  bodyMaxBytes: 8_192,
};

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    forwarded ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

export function rateLimit(
  req: Request,
  scope: string,
  limit: number,
  windowMs: number,
  keyParts: string[] = []
): NextResponse | null {
  const now = Date.now();
  const key = [scope, clientIp(req), ...keyParts].join(":");
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  current.count += 1;
  if (current.count <= limit) return null;

  const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
  return NextResponse.json(
    { error: "Too many attempts. Please try again shortly." },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfter) },
    }
  );
}

export function sameOriginGuard(req: Request): NextResponse | null {
  const origin = req.headers.get("origin");
  if (!origin) return null;

  const host = req.headers.get("host");
  if (!host) return NextResponse.json({ error: "Invalid request." }, { status: 403 });

  try {
    if (new URL(origin).host === host) return null;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  }

  return NextResponse.json({ error: "Invalid request." }, { status: 403 });
}

export async function readLimitedJson<T>(
  req: Request,
  maxBytes = REQUEST_LIMITS.bodyMaxBytes
): Promise<T | null> {
  const text = await req.text();
  if (new TextEncoder().encode(text).length > maxBytes) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}
