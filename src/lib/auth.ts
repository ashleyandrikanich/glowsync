import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const COOKIE = "glowsync_session";

function secretKey(): Uint8Array {
  const raw = process.env.AUTH_SECRET;
  if (!raw || raw.length < 24) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("AUTH_SECRET must be set (min 24 chars) in production.");
    }
    return new TextEncoder().encode(
      "dev-only-glowsync-secret-replace-in-env-32b"
    );
  }
  return new TextEncoder().encode(raw);
}

export type SessionUser = { id: string; email: string };

export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({ email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey());
}

export async function getSession(): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      algorithms: ["HS256"],
    });
    const id = typeof payload.sub === "string" ? payload.sub : null;
    const email = typeof payload.email === "string" ? payload.email : null;
    if (!id || !email) return null;
    return { id, email };
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.set(COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
