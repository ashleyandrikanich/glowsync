import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { createSessionToken, setSessionCookie } from "@/src/lib/auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      email?: string;
      password?: string;
      name?: string;
    };
    const emailRaw = body.email?.trim().toLowerCase();
    const password = body.password ?? "";
    const name = body.name?.trim() || null;

    if (!emailRaw || !EMAIL_RE.test(emailRaw)) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email: emailRaw } });
    if (existing) {
      return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
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
