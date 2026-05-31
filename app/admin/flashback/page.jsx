import { getFlashbackPhotos } from "@/lib/data";
import AdminNav from "../AdminNav";
import { addFlashback, deleteFlashback } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Manage Flashback" };

export default async function AdminFlashback() {
  const photos = await getFlashbackPhotos();

  return (
    <>
      <AdminNav />
      <section className="section">
        <div className="container">
          <h1>Flashback Photos</h1>
          <div className="admin-grid">
            <div>
              <h3>Add a photo</h3>
              <form action={addFlashback} className="form" style={{ maxWidth: "none" }}>
                <label>Image URL *</label>
                <input name="image_url" required placeholder="https://..." />
                <label>Caption</label>
                <input name="caption" placeholder="Senior prom, spring 2005" />
                <button className="btn btn-primary" type="submit">Add Photo</button>
              </form>
              <p className="notice" style={{ marginTop: 14 }}>
                Paste a direct image link (ending in .jpg/.png). You can host photos on any
                image host, or add Vercel Blob / Cloudinary later for direct uploads.
              </p>
            </div>

            <div>
              <h3>Current photos ({photos.length})</h3>
              {photos.length === 0 ? (
                <p className="empty">None yet.</p>
              ) : (
                photos.map((p) => (
                  <div key={p.id} className="list-row">
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image_url} alt={p.caption || ""} style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 8 }} />
                      <span className="meta" style={{ margin: 0 }}>{p.caption || "—"}</span>
                    </div>
                    <form action={deleteFlashback}>
                      <input type="hidden" name="id" value={p.id} />
                      <button className="btn btn-danger" type="submit">Delete</button>
                    </form>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
