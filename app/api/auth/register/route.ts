import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createSessionToken, setSessionCookie } from "@/src/lib/auth";
import {
  passwordMeetsAllRules,
  passwordPolicyErrorMessage,
} from "@/src/lib/password-policy";
import { prisma } from "@/src/lib/prisma";
import {
  REQUEST_LIMITS,
  rateLimit,
  readLimitedJson,
  sameOriginGuard,
} from "@/src/lib/request-security";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const originBlocked = sameOriginGuard(req);
    if (originBlocked) return originBlocked;

    const body = await readLimitedJson<{
      email?: string;
      password?: string;
      name?: string;
    }>(req);
    if (!body) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const emailRaw = body.email?.trim().toLowerCase();
    const password = body.password ?? "";
    const name = body.name?.trim() || null;
    const limited = rateLimit(req, "register", 5, 60 * 60 * 1000, [
      emailRaw ?? "missing",
    ]);
    if (limited) return limited;

    if (
      !emailRaw ||
      emailRaw.length > REQUEST_LIMITS.emailMax ||
      !EMAIL_RE.test(emailRaw)
    ) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }
    if (password.length > REQUEST_LIMITS.passwordMax) {
      return NextResponse.json({ error: "Password is too long." }, { status: 400 });
    }
    if (name && name.length > REQUEST_LIMITS.nameMax) {
      return NextResponse.json({ error: "Display name is too long." }, { status: 400 });
    }
    if (!passwordMeetsAllRules(password)) {
      return NextResponse.json(
        { error: passwordPolicyErrorMessage() },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email: emailRaw } });
    if (existing) {
      return NextResponse.json({ error: "Unable to create account." }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email: emailRaw, passwordHash, name },
    });

    const token = await createSessionToken({ id: user.id, email: user.email });
    await setSessionCookie(token);

    return NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Registration failed." }, { status: 500 });
  }
}
