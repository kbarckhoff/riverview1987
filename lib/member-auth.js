import { cookies } from "next/headers";
import crypto from "crypto";
import { query } from "./db";
import site from "./site-config";

const COOKIE = "reunion_member";
const secret = () => process.env.ADMIN_SECRET || "dev-secret";

export function hashPassword(pw) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(pw, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}
export function verifyPassword(pw, stored) {
  try {
    const [, salt, hash] = stored.split(":");
    const h = crypto.scryptSync(pw, salt, 64).toString("hex");
    const a = Buffer.from(h), b = Buffer.from(hash);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
function sign(id) {
  const h = crypto.createHmac("sha256", secret()).update(String(id)).digest("hex");
  return `${id}.${h}`;
}
export function setMemberSession(id) {
  cookies().set(COOKIE, sign(id), {
    httpOnly: true, sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/", maxAge: 60 * 60 * 24 * 120,
  });
}
export function clearMemberSession() { cookies().delete(COOKIE); }
export function getMemberId() {
  const c = cookies().get(COOKIE);
  if (!c) return null;
  const id = c.value.split(".")[0];
  if (sign(id) !== c.value) return null;
  return Number(id);
}
export async function getCurrentMember() {
  const id = getMemberId();
  if (!id) return null;
  const { rows } = await query("SELECT id, email, name, is_admin FROM members WHERE id=$1", [id]);
  const m = rows[0];
  if (!m) return null;
  // Admin if the email is in the config allowlist OR an admin promoted them in-app.
  const admins = (site.adminEmails || []).map((e) => e.toLowerCase());
  m.is_admin = admins.includes((m.email || "").toLowerCase()) || m.is_admin === true;
  return m;
}
