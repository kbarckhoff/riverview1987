import Link from "next/link";
import { logout } from "./actions";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/classmates", label: "Classmates" },
  { href: "/admin/memorials", label: "Memorials" },
  { href: "/admin/feed", label: "Feed" },
  { href: "/admin/flashback", label: "Flashback" },
];

export default function AdminNav() {
  return (
    <div className="nav" style={{ background: "#0e2238" }}>
      <div className="nav-inner">
        <span className="brand">Organizer Dashboard</span>
        <div className="nav-links" style={{ alignItems: "center" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
          <Link href="/" style={{ opacity: 0.7 }}>View site ↗</Link>
          <form action={logout}>
            <button className="btn btn-danger" type="submit">Log out</button>
          </form>
        </div>
      </div>
    </div>
  );
}
