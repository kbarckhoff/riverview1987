import site from "@/lib/site-config";
import { getMemorials } from "@/lib/data";
import Avatar from "../components/Avatar";

export const dynamic = "force-dynamic";

export const metadata = { title: "Memorials" };

export default async function MemorialsPage() {
  const memorials = await getMemorials();

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>In Memoriam</h1>
          <p>Remembering the classmates of {site.classYear} we've lost. They are with us always.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {memorials.length === 0 ? (
            <p className="empty">No memorials added yet.</p>
          ) : (
            <div className="grid grid-3">
              {memorials.map((m) => (
                <article key={m.id} className="card memorial">
                  <Avatar name={m.full_name} url={m.photo_url} />
                  <div className="card-body">
                    <h3>{m.full_name}</h3>
                    {(m.birth_year || m.passed_year) && (
                      <p className="years">
                        {m.birth_year || "?"} – {m.passed_year || "?"}
                      </p>
                    )}
                    {m.tribute ? <p style={{ margin: "8px 0 0" }}>{m.tribute}</p> : null}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
