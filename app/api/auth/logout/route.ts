import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/src/lib/auth";
import { sameOriginGuard } from "@/src/lib/request-security";

export async function POST(req: Request) {
  const originBlocked = sameOriginGuard(req);
  if (originBlocked) return originBlocked;

  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
