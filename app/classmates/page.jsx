import Link from "next/link";
import site from "@/lib/site-config";
import { getClassmates } from "@/lib/data";
import { getCurrentMember } from "@/lib/member-auth";
import { getProfileForMember } from "@/lib/community";
import Avatar from "../components/Avatar";
import ProfileFormClient from "../components/ProfileFormClient";

export const dynamic = "force-dynamic";
export const metadata = { title: "Classmates Directory" };

export default async function ClassmatesPage() {
  const classmates = await getClassmates();
  const me = await getCurrentMember();
  const profile = me ? await getProfileForMember(me.id) : null;

  return (
    <>
      <div className="page-header"><div className="container">
        <h1>Classmates</h1>
        <p>The Class of {site.classYear} — {classmates.length} Raiders listed.</p>
      </div></div>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          {!me ? (
            <div className="form access-gate">
              <h3 style={{ marginTop: 0 }}>Add yourself to the directory</h3>
              <p className="meta" style={{ marginTop: 0 }}>Create an account (you&apos;ll need the class access code) to add your profile and photos.</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href="/account/register" className="btn">Create Account</Link>
                <Link href="/account/login" className="btn btn-outline">Log In</Link>
              </div>
            </div>
          ) : profile ? (
            <div className="form" style={{ maxWidth: "none" }}>
              <h3 style={{ marginTop: 0 }}>You&apos;re in the directory ✓</h3>
              <p className="meta" style={{ marginTop: 0 }}>Your profile is live below. You can update it anytime — there&apos;s just one profile per person.</p>
              <details className="disclosure">
                <summary className="btn btn-outline">Edit my info</summary>
                <div style={{ marginTop: 16 }}><ProfileFormClient profile={profile} /></div>
              </details>
            </div>
          ) : (
            <>
              <div className="section-head"><h2>Add Your Profile</h2><p>Then &amp; now photos, where you landed, and what you&apos;ve been up to.</p></div>
              <ProfileFormClient profile={null} />
            </>
          )}
        </div>
      </section>

      <section className="section"><div className="container">
        {classmates.length === 0 ? (
          <p className="empty">No classmates added yet. Be the first!</p>
        ) : (
          <div className="grid grid-3">
            {classmates.map((c) => (
              <article key={c.id} className="card">
                {c.photo_then_url && c.photo_now_url ? (
                  <div className="thennow">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <figure><img className="avatar" src={c.photo_then_url} alt={`${c.full_name} then`} /><figcaption>Then</figcaption></figure>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <figure><img className="avatar" src={c.photo_now_url} alt={`${c.full_name} now`} /><figcaption>Now</figcaption></figure>
                  </div>
                ) : (
                  <Avatar name={c.full_name} url={c.photo_now_url || c.photo_then_url} />
                )}
                <div className="card-body">
                  <h3>{c.full_name}</h3>
                  {c.occupation ? <p className="meta">{c.occupation}{c.current_city ? ` · ${c.current_city}` : ""}</p> : c.current_city ? <p className="meta">{c.current_city}</p> : null}
                  {c.bio ? <p style={{ margin: 0 }}>{c.bio}</p> : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </div></section>
    </>
  );
}
