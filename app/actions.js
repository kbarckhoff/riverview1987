"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query } from "@/lib/db";
import site from "@/lib/site-config";
import { hasAccess, checkAccessCode, grantAccess } from "@/lib/access";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

function str(v, max = 1000) {
  const s = (v ?? "").toString().trim();
  return s === "" ? null : s.slice(0, max);
}

// Validate the shared class code and unlock posting for this browser.
export async function unlockAccess(formData) {
  const code = (formData.get("code") || "").toString();
  const from = (formData.get("from") || "/classmates").toString();
  const ok = checkAccessCode(code);
  if (ok) grantAccess();
  // Redirect so the next render sees the new cookie (unlocks on first click).
  redirect(ok ? from : `${from}?badcode=1`);
}

async function storePhoto(file) {
  if (!file || typeof file === "string" || !file.size) return null;
  if (file.size > MAX_BYTES) throw new Error("Photo is too large (max 8MB).");
  const mime = file.type || "image/jpeg";
  if (!mime.startsWith("image/")) throw new Error("Only image files are allowed.");
  const buf = Buffer.from(await file.arrayBuffer());
  const { rows } = await query(
    "INSERT INTO photos (mime, data) VALUES ($1, $2) RETURNING id",
    [mime, buf]
  );
  return `/api/photo/${rows[0].id}`;
}

export async function addClassmateProfile(formData) {
  if (!hasAccess()) throw new Error("Enter the class access code to post.");
  const full_name = str(formData.get("full_name"), 120);
  if (!full_name) return;

  const thenUrl = await storePhoto(formData.get("photo_then"));
  const nowUrl = await storePhoto(formData.get("photo_now"));

  await query(
    `INSERT INTO classmates
       (full_name, maiden_name, occupation, bio, current_city, photo_then_url, photo_now_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7)`,
    [
      full_name,
      str(formData.get("maiden_name"), 120),
      str(formData.get("occupation"), 160),
      str(formData.get("bio"), 2000),
      str(formData.get("current_city"), 160),
      thenUrl,
      nowUrl,
    ]
  );
  revalidatePath("/classmates");
  revalidatePath("/where-are-they-now");
}

export async function createPublicPost(formData) {
  if (!site.allowPublicPosts) return;
  if (!hasAccess()) throw new Error("Enter the class access code to post.");
  const author = str(formData.get("author"), 80);
  const body = str(formData.get("body"), 2000);
  if (!author || !body) return;
  await query("INSERT INTO feed_posts (author, body) VALUES ($1, $2)", [author, body]);
  revalidatePath("/feed");
}
