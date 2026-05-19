import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { createSessionToken, setSessionCookie } from "@/src/lib/auth";
import {
  REQUEST_LIMITS,
  rateLimit,
  readLimitedJson,
  sameOriginGuard,
} from "@/src/lib/request-security";

export async function POST(req: Request) {
  try {
    const originBlocked = sameOriginGuard(req);
    if (originBlocked) return originBlocked;

    const body = await readLimitedJson<{ email?: string; password?: string }>(req);
    if (!body) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const email = body.email?.trim().toLowerCase();
    const password = body.password ?? "";
    const limited = rateLimit(req, "login", 8, 15 * 60 * 1000, [email ?? "missing"]);
    if (limited) return limited;

    if (
      !email ||
      !password ||
      email.length > REQUEST_LIMITS.emailMax ||
      password.length > REQUEST_LIMITS.passwordMax
    ) {
      return NextResponse.json({ error: "Email and password required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = await createSessionToken({ id: user.id, email: user.email });
    await setSessionCookie(token);

    return NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
