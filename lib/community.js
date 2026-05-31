import { query } from "./db";

export async function getProfileForMember(memberId) {
  if (!memberId) return null;
  const { rows } = await query("SELECT * FROM classmates WHERE member_id=$1 ORDER BY id LIMIT 1", [memberId]);
  return rows[0] || null;
}

// Make sure each static throwback URL has a gallery_posts row (so it's commentable).
export async function ensureGalleryPosts(urls) {
  if (!urls || !urls.length) return;
  const values = urls.map((_, i) => `($${i + 1})`).join(",");
  await query(
    `INSERT INTO gallery_posts (image_url) VALUES ${values} ON CONFLICT (image_url) DO NOTHING`,
    urls
  );
}

export async function getGalleryFeed(memberId) {
  const { rows } = await query(
    `SELECT gp.id, gp.image_url, gp.caption, gp.created_at, gp.member_id,
            m.name AS poster_name,
            COALESCE(lc.cnt,0)::int AS like_count,
            COALESCE(cc.cnt,0)::int AS comment_count,
            CASE WHEN $1::int IS NULL THEN false
                 ELSE EXISTS(SELECT 1 FROM likes l WHERE l.post_id=gp.id AND l.member_id=$1) END AS liked
     FROM gallery_posts gp
     LEFT JOIN members m ON m.id=gp.member_id
     LEFT JOIN (SELECT post_id, COUNT(*) cnt FROM likes GROUP BY post_id) lc ON lc.post_id=gp.id
     LEFT JOIN (SELECT post_id, COUNT(*) cnt FROM comments GROUP BY post_id) cc ON cc.post_id=gp.id
     ORDER BY (gp.member_id IS NOT NULL) DESC, gp.created_at DESC, gp.id DESC`,
    [memberId || null]
  );
  return rows;
}

export async function getCommentsForPosts(postIds) {
  const map = {};
  if (!postIds.length) return map;
  const { rows } = await query(
    "SELECT * FROM comments WHERE post_id = ANY($1::int[]) ORDER BY created_at ASC",
    [postIds]
  );
  for (const r of rows) (map[r.post_id] ||= []).push(r);
  return map;
}
