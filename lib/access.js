import { cookies } from "next/headers";
import crypto from "crypto";

export const ACCESS_COOKIE = "reunion_access";

// Cookie value = hash of the access code + secret (never stores the raw code).
export function accessToken() {
  const secret = process.env.ADMIN_SECRET || "dev-secret";
  const code = process.env.ACCESS_CODE || "";
  return crypto
    .createHash("sha256")
    .update(`access::${code}::${secret}`)
    .digest("hex");
}

export function checkAccessCode(input) {
  const expected = process.env.ACCESS_CODE || "";
  if (!expected) return false;
  const a = Buffer.from((input || "").trim());
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function grantAccess() {
  cookies().set(ACCESS_COOKIE, accessToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 120, // 120 days
  });
}

export function hasAccess() {
  const c = cookies().get(ACCESS_COOKIE);
  return !!c && c.value === accessToken();
}
