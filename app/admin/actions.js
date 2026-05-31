"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query } from "@/lib/db";
import { checkPassword, createSession, destroySession, isAdmin } from "@/lib/auth";

function num(v) {
  const s = (v ?? "").toString().trim();
  if (s === "") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}
function str(v, max = 1000) {
  const s = (v ?? "").toString().trim();
  return s === "" ? null : s.slice(0, max);
}
function guard() {
  if (!isAdmin()) throw new Error("Not authorized");
}

// ---------- Auth ----------
export async function login(formData) {
  const password = (formData.get("password") || "").toString();
  if (!checkPassword(password)) {
    redirect("/admin/login?error=1");
  }
  createSession();
  redirect("/admin");
}

export async function logout() {
  destroySession();
  redirect("/admin/login");
}

// ---------- Classmates ----------
export async function addClassmate(formData) {
  guard();
  await query(
    `INSERT INTO classmates
       (full_name, maiden_name, occupation, bio, current_city, lat, lng, photo_then_url, photo_now_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
    [
      str(formData.get("full_name"), 120),
      str(formData.get("maiden_name"), 120),
      str(formData.get("occupation"), 160),
      str(formData.get("bio"), 2000),
      str(formData.get("current_city"), 160),
      num(formData.get("lat")),
      num(formData.get("lng")),
      str(formData.get("photo_then_url"), 500),
      str(formData.get("photo_now_url"), 500),
    ]
  );
  revalidatePath("/admin/classmates");
  revalidatePath("/classmates");
  revalidatePath("/where-are-they-now");
}

export async function deleteClassmate(formData) {
  guard();
  await query("DELETE FROM classmates WHERE id = $1", [num(formData.get("id"))]);
  revalidatePath("/admin/classmates");
  revalidatePath("/classmates");
  revalidatePath("/where-are-they-now");
}

// ---------- Memorials ----------
export async function addMemorial(formData) {
  guard();
  await query(
    `INSERT INTO memorials (full_name, birth_year, passed_year, tribute, photo_url)
     VALUES ($1,$2,$3,$4,$5)`,
    [
      str(formData.get("full_name"), 120),
      num(formData.get("birth_year")),
      num(formData.get("passed_year")),
      str(formData.get("tribute"), 2000),
      str(formData.get("photo_url"), 500),
    ]
  );
  revalidatePath("/admin/memorials");
  revalidatePath("/memorials");
}

export async function deleteMemorial(formData) {
  guard();
  await query("DELETE FROM memorials WHERE id = $1", [num(formData.get("id"))]);
  revalidatePath("/admin/memorials");
  revalidatePath("/memorials");
}

// ---------- Feed ----------
export async function addFeedPost(formData) {
  guard();
  await query("INSERT INTO feed_posts (author, body) VALUES ($1,$2)", [
    str(formData.get("author"), 80),
    str(formData.get("body"), 2000),
  ]);
  revalidatePath("/admin/feed");
  revalidatePath("/feed");
}

export async function deleteFeedPost(formData) {
  guard();
  await query("DELETE FROM feed_posts WHERE id = $1", [num(formData.get("id"))]);
  revalidatePath("/admin/feed");
  revalidatePath("/feed");
}

// ---------- Flashback ----------
export async function addFlashback(formData) {
  guard();
  await query("INSERT INTO flashback_photos (caption, image_url) VALUES ($1,$2)", [
    str(formData.get("caption"), 200),
    str(formData.get("image_url"), 500),
  ]);
  revalidatePath("/admin/flashback");
  revalidatePath("/flashback");
}

export async function deleteFlashback(formData) {
  guard();
  await query("DELETE FROM flashback_photos WHERE id = $1", [num(formData.get("id"))]);
  revalidatePath("/admin/flashback");
  revalidatePath("/flashback");
}
