import { query } from "./db";

// All reads happen at request time so newly-added rows show up immediately.

export async function getClassmates() {
  const { rows } = await query(
    "SELECT * FROM classmates ORDER BY full_name ASC"
  );
  return rows;
}

export async function getClassmatesWithCoords() {
  const { rows } = await query(
    "SELECT id, full_name, current_city, lat, lng FROM classmates WHERE lat IS NOT NULL AND lng IS NOT NULL"
  );
  return rows;
}

export async function getMemorials() {
  const { rows } = await query(
    "SELECT * FROM memorials ORDER BY full_name ASC"
  );
  return rows;
}

export async function getFeedPosts() {
  const { rows } = await query(
    "SELECT * FROM feed_posts ORDER BY created_at DESC"
  );
  return rows;
}

export async function getFlashbackPhotos() {
  const { rows } = await query(
    "SELECT * FROM flashback_photos ORDER BY created_at DESC"
  );
  return rows;
}
