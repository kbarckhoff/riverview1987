import site from "@/lib/site-config";
import { getClassmates } from "@/lib/data";
import { hasAccess } from "@/lib/access";
import Avatar from "../components/Avatar";
import AccessGate from "../components/AccessGate";
import AddClassmateForm from "../components/AddClassmateForm";

export const dynamic = "force-dynamic";

export const metadata = { title: "Classmates Directory" };

export default async function ClassmatesPage({ searchParams }) {
  const classmates = await getClassmates();
  const unlocked = hasAccess();

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Classmates</h1>
          <p>The Class of {site.classYear} — {classmates.length} Raiders listed. Add yourself below.</p>
        </div>
      </div>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="section-head">
            <h2>Add Your Profile</h2>
            <p>Then &amp; now photos, where you landed, and what you&apos;ve been up to.</p>
          </div>
          <AccessGate
            unlocked={unlocked}
            redirectTo="/classmates"
            badCode={searchParams?.badcode}
            title="Add yourself to the directory"
            blurb="Enter the class access code (from your invite) to add your profile and photos."
          >
            <AddClassmateForm />
          </AccessGate>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {classmates.length === 0 ? (
            <p className="empty">No classmates added yet. Be the first!</p>
          ) : (
            <div className="grid grid-3">
              {classmates.map((c) => (
                <article key={c.id} className="card">
                  {c.photo_then_url && c.photo_now_url ? (
                    <div className="thennow">
                      <figure>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="avatar" src={c.photo_then_url} alt={`${c.full_name} then`} />
                        <figcaption>Then</figcaption>
                      </figure>
                      <figure>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="avatar" src={c.photo_now_url} alt={`${c.full_name} now`} />
                        <figcaption>Now</figcaption>
                      </figure>
                    </div>
                  ) : (
                    <Avatar name={c.full_name} url={c.photo_now_url || c.photo_then_url} />
                  )}
                  <div className="card-body">
                    <h3>
                      {c.full_name}
                      {c.maiden_name ? <span style={{ color: "var(--muted)", fontWeight: 400 }}> (née {c.maiden_name})</span> : null}
                    </h3>
                    {c.occupation ? <p className="meta">{c.occupation}{c.current_city ? ` · ${c.current_city}` : ""}</p> : c.current_city ? <p className="meta">{c.current_city}</p> : null}
                    {c.bio ? <p style={{ margin: 0 }}>{c.bio}</p> : null}
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
