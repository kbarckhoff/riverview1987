import { cookies } from "next/headers";
import crypto from "crypto";

export const COOKIE_NAME = "reunion_admin";

// The cookie value is a hash of the password + secret. We never store the raw
// password in the cookie, and the cookie is httpOnly so client JS can't read it.
export function sessionToken() {
  const secret = process.env.ADMIN_SECRET || "dev-secret";
  const password = process.env.ADMIN_PASSWORD || "";
  return crypto
    .createHash("sha256")
    .update(`${password}::${secret}`)
    .digest("hex");
}

export function checkPassword(input) {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  // constant-time compare
  const a = Buffer.from(input || "");
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function createSession() {
  cookies().set(COOKIE_NAME, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export function destroySession() {
  cookies().delete(COOKIE_NAME);
}

export function isAdmin() {
  const c = cookies().get(COOKIE_NAME);
  return !!c && c.value === sessionToken();
}
