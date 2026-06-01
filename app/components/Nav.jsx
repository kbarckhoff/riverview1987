import Link from "next/link";
import site from "@/lib/site-config";
import { getCurrentMember } from "@/lib/member-auth";
import { logoutAccount } from "../account/actions";

const links = [
  { href: "/", label: "Home" },
  { href: "/classmates", label: "Classmates" },
  { href: "/where-are-they-now", label: "Where Are They Now" },
  { href: "/memorials", label: "Memorials" },
  { href: "/flashback", label: "Flashback" },
  { href: "/teachers", label: "Teachers" },
  { href: "/feed", label: "Feed" },
  { href: "/soundtrack", label: "Soundtrack" },
];

export default async function Nav() {
  const me = await getCurrentMember();
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

        <input type="checkbox" id="navtoggle" className="nav-toggle" aria-hidden="true" />
        <label htmlFor="navtoggle" className="nav-burger" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </label>

        <div className="nav-menu">
          <div className="nav-links">
            {links.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </div>
          <div className="nav-auth">
            {me ? (
              <>
                <span className="nav-who">{me.name.split(" ")[0]}{me.is_admin ? " · Admin" : ""}</span>
                <form action={logoutAccount}><button className="navbtn" type="submit">Log out</button></form>
              </>
            ) : (
              <>
                <Link href="/account/login" className="navbtn-ghost">Log in</Link>
                <Link href="/account/register" className="navbtn">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
