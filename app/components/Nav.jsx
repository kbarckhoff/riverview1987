import Link from "next/link";
import site from "@/lib/site-config";

const links = [
  { href: "/", label: "Home" },
  { href: "/classmates", label: "Classmates" },
  { href: "/where-are-they-now", label: "Where Are They Now" },
  { href: "/memorials", label: "Memorials" },
  { href: "/flashback", label: "Flashback" },
  { href: "/feed", label: "Feed" },
];

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="brand">
          {site.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={site.logo} alt={`${site.schoolName} logo`} />
          ) : null}
          <span>
            {site.mascot || `Class of ${site.classYear}`}
            <small>{site.schoolName}</small>
          </span>
        </Link>
        <div className="nav-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
