import Link from "next/link";
import { query } from "@/lib/db";
import AdminNav from "./AdminNav";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dashboard" };

async function counts() {
  const tables = ["classmates", "memorials", "feed_posts", "flashback_photos"];
  const out = {};
  for (const t of tables) {
    const { rows } = await query(`SELECT COUNT(*)::int AS n FROM ${t}`);
    out[t] = rows[0].n;
  }
  return out;
}

export default async function AdminDashboard() {
  const c = await counts();
  const tiles = [
    { href: "/admin/classmates", label: "Classmates", n: c.classmates },
    { href: "/admin/memorials", label: "Memorials", n: c.memorials },
    { href: "/admin/feed", label: "Feed posts", n: c.feed_posts },
    { href: "/admin/flashback", label: "Flashback photos", n: c.flashback_photos },
  ];

  return (
    <>
      <AdminNav />
      <section className="section">
        <div className="container">
          <h1>Dashboard</h1>
          <p className="meta" style={{ marginBottom: 24 }}>Add and manage everything on the reunion site from here.</p>
          <div className="grid grid-4">
            {tiles.map((t) => (
              <Link key={t.href} href={t.href} className="feature" style={{ display: "block", textAlign: "center" }}>
                <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "var(--primary)" }}>{t.n}</div>
                <h3 style={{ margin: "6px 0 2px" }}>{t.label}</h3>
                <span style={{ color: "var(--accent)", fontWeight: 700 }}>Manage →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
