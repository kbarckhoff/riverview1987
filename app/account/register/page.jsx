import Link from "next/link";
import site from "@/lib/site-config";
import { registerAccount } from "../actions";

export const metadata = { title: "Create Account" };

const ERR = {
  code: "That class access code wasn't right. Check your invite.",
  fields: "Please enter your name, a valid email, and a password (6+ characters).",
  exists: "An account with that email already exists — try logging in.",
};

export default function RegisterPage({ searchParams }) {
  const err = ERR[searchParams?.err];
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 520 }}>
        <h1>Create your account</h1>
        <p className="meta" style={{ marginBottom: 18 }}>
          Join the {site.schoolName} Class of {site.classYear} community to add your profile,
          share photos, and comment.
        </p>
        {err ? <div className="notice" style={{ marginBottom: 14, background: "rgba(179,38,30,0.12)", borderColor: "#7a2a25", color: "#ffb4ad" }}>{err}</div> : null}
        <form action={registerAccount} className="form" style={{ maxWidth: "none" }}>
          <label>Class access code</label>
          <input name="code" required placeholder="From your reunion invite" autoComplete="off" />
          <label>Your name</label>
          <input name="name" required placeholder="First and last" />
          <label>Email</label>
          <input name="email" type="email" required placeholder="you@example.com" />
          <label>Password</label>
          <input name="password" type="password" required minLength={6} placeholder="At least 6 characters" />
          <button className="btn" type="submit">Create Account</button>
        </form>
        <p className="meta" style={{ marginTop: 14 }}>
          Already have an account? <Link href="/account/login">Log in</Link>
        </p>
      </div>
    </section>
  );
}
