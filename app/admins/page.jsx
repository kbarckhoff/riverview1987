import { redirect } from "next/navigation";
import { getCurrentMember } from "@/lib/member-auth";
import { query } from "@/lib/db";
import site from "@/lib/site-config";
import { setMemberAdmin, addAdminByEmail } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Manage Admins" };

export default async function AdminsPage() {
  const me = await getCurrentMember();
  if (!me?.is_admin) redirect("/account/login");

  const { rows: members } = await query("SELECT id,email,name,is_admin FROM members ORDER BY name ASC");
  const allowlist = (site.adminEmails || []).map((e) => e.toLowerCase());

  return (
    <>
      <div className="page-header"><div className="container">
        <h1>Manage Admins</h1>
        <p>Give classmates admin powers (edit/delete any content), or remove them.</p>
      </div></div>

      <section className="section"><div className="container" style={{ maxWidth: 760 }}>
        <form action={addAdminByEmail} className="form" style={{ maxWidth: "none", marginBottom: 28 }}>
          <h3 style={{ marginTop: 0 }}>Make someone an admin</h3>
          <p className="meta" style={{ marginTop: 0 }}>Enter the email they registered with. They must already have an account.</p>
          <label>Email</label>
          <input name="email" type="email" required placeholder="classmate@example.com" />
          <button className="btn" type="submit">Make Admin</button>
        </form>

        <h3>All members ({members.length})</h3>
        {members.length === 0 ? <p className="empty">No members yet.</p> : members.map((mem) => {
          const locked = allowlist.includes((mem.email || "").toLowerCase());
          const isAdmin = locked || mem.is_admin;
          return (
            <div key={mem.id} className="list-row">
              <div>
                <strong>{mem.name}</strong>{isAdmin ? <span className="nav-who" style={{ marginLeft: 8 }}>Admin</span> : null}
                <div className="meta" style={{ margin: 0 }}>{mem.email}</div>
              </div>
              {locked ? (
                <span className="meta">Always admin</span>
              ) : (
                <form action={setMemberAdmin}>
                  <input type="hidden" name="member_id" value={mem.id} />
                  <input type="hidden" name="make" value={mem.is_admin ? "0" : "1"} />
                  <button className="btn btn-outline" type="submit">{mem.is_admin ? "Remove admin" : "Make admin"}</button>
                </form>
              )}
            </div>
          );
        })}
      </div></section>
    </>
  );
}
