import { query } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req, { params }) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) return new Response("Not found", { status: 404 });

  const { rows } = await query("SELECT mime, data FROM photos WHERE id = $1", [id]);
  if (!rows.length) return new Response("Not found", { status: 404 });

  const { mime, data } = rows[0];
  return new Response(data, {
    status: 200,
    headers: {
      "Content-Type": mime || "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
