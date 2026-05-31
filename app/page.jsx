import Link from "next/link";
import site from "@/lib/site-config";
import Countdown from "./components/Countdown";
import Collage from "./components/Collage";
import Icon from "./components/Icon";

const features = [
  { href: "/classmates", icon: "people", title: "Classmates", desc: "Add yourself, then & now photos, and what everyone's up to." },
  { href: "/where-are-they-now", icon: "pin", title: "Where Are They Now", desc: "See our class spread across the map, city by city." },
  { href: "/memorials", icon: "heart", title: "Memorials", desc: "Honoring the Raiders we've lost. Leave a tribute." },
  { href: "/flashback", icon: "camera", title: "Flashback", desc: "Prom, homecoming, graduation — the photos that started it all." },
  { href: "/feed", icon: "chat", title: "Feed", desc: "Catch up, plan rides, and reminisce before the big night." },
];

export default function HomePage() {
  const e = site.event;
  return (
    <>
      {/* ---------- Hero (Oaks marquee photo, fading to black) ---------- */}
      <section className="hero hero-marquee">
        <div className="hero-bg" style={{ backgroundImage: `url(${site.heroImage})` }} aria-hidden="true" />
        <div className="hero-fade" aria-hidden="true" />
        <div className="container">
          <div className="hero-content">
            {site.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="hero-logo" src={site.logo} alt={`${site.schoolName} Raiders logo`} />
            ) : null}
            <span className="kicker">Class of {site.classYear} · 40-Year Reunion</span>
            <h1>
              {site.schoolName.replace(/ High School$/, "")} <span className="gold">Raiders</span>
            </h1>
            <p className="lede">{site.tagline}</p>

            <Countdown target={e.dateISO} />
            <p className="count-label" style={{ color: "#cfcfcf", letterSpacing: "0.16em" }}>
              Until {e.date}
            </p>

            <div className="hero-cta">
              <Link href="/classmates" className="btn">Add Your Profile</Link>
              {e.rsvpUrl ? (
                <a href={e.rsvpUrl} className="btn btn-outline" target="_blank" rel="noreferrer">RSVP for the Reunion</a>
              ) : (
                <Link href="/feed" className="btn btn-outline">Join the Conversation</Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Marquee strip ---------- */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>
              {Array.from({ length: 6 }).map((__, i) => (
                <span key={i}>{site.schoolName} <span className="dot">★</span> </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ---------- Save the Date (detailed Oaks poster) ---------- */}
      <section className="section savedate">
        <div className="container savedate-grid">
          <div className="poster-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gallery/oaks-poster-final-1.jpeg" alt="Save the Date — Riverview High School Class of 1987 Reunion at the Oaks Theater" />
          </div>
          <div className="savedate-copy">
            <span className="kicker">Save the Date</span>
            <h2 className="display neon">{e.date}</h2>
            <p className="venue-line">{e.venue} · {e.time}</p>
            <p className="lede">
              Forty years later, the Riverview High School Class of {site.classYear} is coming back
              together for a night of memories, music, laughter, and Raider pride — under the lights
              at the historic Oaks Theater.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
              <Link href="/classmates" className="btn">RSVP / Add Your Info</Link>
              <Link href="/flashback" className="btn btn-outline">See the Photos</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Collage ---------- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Collage />
        </div>
      </section>

      {/* ---------- Explore ---------- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <h2>Explore</h2>
            <p>Everything you need to reconnect before {e.date}.</p>
          </div>
          <div className="grid grid-3">
            {features.map((f) => (
              <Link key={f.href} href={f.href} className="feature" style={{ display: "block" }}>
                <div className="ficon"><Icon name={f.icon} /></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <span style={{ color: "var(--accent)", fontWeight: 800 }}>Open →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
