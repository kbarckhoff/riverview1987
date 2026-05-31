import site from "@/lib/site-config";
import { getFlashbackPhotos } from "@/lib/data";
import { getGalleryImages } from "@/lib/gallery";

export const dynamic = "force-dynamic";

export const metadata = { title: "Flashback" };

export default async function FlashbackPage() {
  const dbPhotos = await getFlashbackPhotos();
  const gallery = getGalleryImages();
  const total = gallery.length + dbPhotos.length;

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Flashback</h1>
          <p>Throwback photos from our days at {site.schoolName} — {total} and counting.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {total === 0 ? (
            <p className="empty">No flashback photos yet.</p>
          ) : (
            <div className="grid grid-4">
              {gallery.map((src) => (
                <figure key={src} className="card" style={{ margin: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="avatar" src={src} alt="Raiders throwback" loading="lazy" />
                </figure>
              ))}
              {dbPhotos.map((p) => (
                <figure key={p.id} className="card" style={{ margin: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="avatar" src={p.image_url} alt={p.caption || "Flashback photo"} loading="lazy" />
                  {p.caption ? (
                    <figcaption className="card-body" style={{ padding: 12 }}>{p.caption}</figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
