import site from "@/lib/site-config";
import { getMemorials } from "@/lib/data";
import { getCurrentMember } from "@/lib/member-auth";
import Avatar from "../components/Avatar";
import MemorialFormClient from "../components/MemorialFormClient";
import { deleteMemorialAdmin } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Memorials" };

export default async function MemorialsPage() {
  const memorials = await getMemorials();
  const me = await getCurrentMember();

  return (
    <>
      <div className="page-header"><div className="container">
        <h1>In Memoriam</h1>
        <p>Remembering the Raiders of {site.classYear} we&apos;ve lost. They are with us always.</p>
      </div></div>

      <section className="section"><div className="container">
        {me?.is_admin ? (
          <div style={{ maxWidth: 560, margin: "0 auto 30px" }}><MemorialFormClient /></div>
        ) : null}

        {memorials.length === 0 ? (
          <p className="empty">No memorials yet.</p>
        ) : (
          <div className="grid grid-3">
            {memorials.map((m) => (
              <article key={m.id} className="card memorial">
                <Avatar name={m.full_name} url={m.photo_url} />
                <div className="card-body">
                  <h3>{m.full_name}</h3>
                  {(m.birth_year || m.passed_year) && (
                    <p className="years">{m.birth_year || "?"} – {m.passed_year || "?"}</p>
                  )}
                  {m.tribute ? <p style={{ margin: "8px 0 0" }}>{m.tribute}</p> : null}
                  {me?.is_admin ? (
                    <form action={deleteMemorialAdmin} style={{ marginTop: 10 }}>
                      <input type="hidden" name="id" value={m.id} />
                      <button className="btn btn-danger" type="submit">Delete</button>
                    </form>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </div></section>
    </>
  );
}
