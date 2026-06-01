"use server";

import { revalidatePath } from "next/cache";
import { query } from "@/lib/db";
import { getCurrentMember } from "@/lib/member-auth";

const MAX = 8 * 1024 * 1024;
function str(v, max = 1000) { const s = (v ?? "").toString().trim(); return s === "" ? null : s.slice(0, max); }

async function storePhoto(file) {
  if (!file || typeof file === "string" || !file.size) return null;
  if (file.size > MAX) throw new Error("Photo is too large (max 8MB).");
  const mime = file.type || "image/jpeg";
  if (!mime.startsWith("image/")) throw new Error("Only image files are allowed.");
  const buf = Buffer.from(await file.arrayBuffer());
  const { rows } = await query("INSERT INTO photos (mime, data) VALUES ($1,$2) RETURNING id", [mime, buf]);
  return `/api/photo/${rows[0].id}`;
}

export async function saveProfile(formData) {
  const me = await getCurrentMember(); if (!me) throw new Error("Please log in.");
  const full_name = str(formData.get("full_name"), 120) || me.name;
  const thenUrl = await storePhoto(formData.get("photo_then"));
  const nowUrl = await storePhoto(formData.get("photo_now"));
  const vals = [full_name, str(formData.get("maiden_name"), 120), str(formData.get("occupation"), 160), str(formData.get("bio"), 2000), str(formData.get("current_city"), 160)];
  const existing = await query("SELECT id FROM classmates WHERE member_id=$1", [me.id]);
  if (existing.rows.length) {
    await query(`UPDATE classmates SET full_name=$1,maiden_name=$2,occupation=$3,bio=$4,current_city=$5,
      photo_then_url=COALESCE($6,photo_then_url), photo_now_url=COALESCE($7,photo_now_url) WHERE member_id=$8`,
      [...vals, thenUrl, nowUrl, me.id]);
  } else {
    await query(`INSERT INTO classmates (full_name,maiden_name,occupation,bio,current_city,photo_then_url,photo_now_url,member_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`, [...vals, thenUrl, nowUrl, me.id]);
  }
  revalidatePath("/classmates"); revalidatePath("/where-are-they-now");
}

export async function postGalleryPhoto(formData) {
  const me = await getCurrentMember(); if (!me) throw new Error("Please log in.");
  const url = await storePhoto(formData.get("photo"));
  if (!url) return;
  await query("INSERT INTO gallery_posts (member_id,image_url,caption) VALUES ($1,$2,$3) ON CONFLICT (image_url) DO NOTHING",
    [me.id, url, str(formData.get("caption"), 300)]);
  revalidatePath("/flashback");
}

export async function addComment(formData) {
  const me = await getCurrentMember(); if (!me) throw new Error("Please log in.");
  const postId = Number(formData.get("post_id")); const body = str(formData.get("body"), 1000);
  if (!postId || !body) return;
  await query("INSERT INTO comments (post_id,member_id,author_name,body) VALUES ($1,$2,$3,$4)", [postId, me.id, me.name, body]);
  revalidatePath("/flashback");
}

export async function toggleLike(formData) {
  const me = await getCurrentMember(); if (!me) throw new Error("Please log in.");
  const postId = Number(formData.get("post_id")); if (!postId) return;
  const ex = await query("SELECT 1 FROM likes WHERE post_id=$1 AND member_id=$2", [postId, me.id]);
  if (ex.rows.length) await query("DELETE FROM likes WHERE post_id=$1 AND member_id=$2", [postId, me.id]);
  else await query("INSERT INTO likes (post_id,member_id) VALUES ($1,$2) ON CONFLICT DO NOTHING", [postId, me.id]);
  revalidatePath("/flashback");
}

export async function createFeedPost(formData) {
  const me = await getCurrentMember(); if (!me) throw new Error("Please log in.");
  const body = str(formData.get("body"), 2000); if (!body) return;
  await query("INSERT INTO feed_posts (author,body) VALUES ($1,$2)", [me.name, body]);
  revalidatePath("/feed");
}

export async function adminDeletePost(formData) {
  const me = await getCurrentMember(); if (!me || !me.is_admin) throw new Error("Admins only.");
  await query("DELETE FROM gallery_posts WHERE id=$1", [Number(formData.get("post_id"))]);
  revalidatePath("/flashback");
}
export async function adminDeleteComment(formData) {
  const me = await getCurrentMember(); if (!me || !me.is_admin) throw new Error("Admins only.");
  await query("DELETE FROM comments WHERE id=$1", [Number(formData.get("comment_id"))]);
  revalidatePath("/flashback");
}


export async function createFeedReply(formData) {
  const me = await getCurrentMember(); if (!me) throw new Error("Please log in.");
  const postId = Number(formData.get("post_id")); const body = str(formData.get("body"), 1000);
  if (!postId || !body) return;
  await query("INSERT INTO feed_replies (post_id,member_id,author_name,body) VALUES ($1,$2,$3,$4)", [postId, me.id, me.name, body]);
  revalidatePath("/feed");
}
export async function adminDeleteFeedPost(formData) {
  const me = await getCurrentMember(); if (!me || !me.is_admin) throw new Error("Admins only.");
  await query("DELETE FROM feed_posts WHERE id=$1", [Number(formData.get("post_id"))]);
  revalidatePath("/feed");
}
export async function adminDeleteFeedReply(formData) {
  const me = await getCurrentMember(); if (!me || !me.is_admin) throw new Error("Admins only.");
  await query("DELETE FROM feed_replies WHERE id=$1", [Number(formData.get("reply_id"))]);
  revalidatePath("/feed");
}
