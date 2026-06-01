import Link from "next/link";
import { performPasswordReset } from "../actions";

export const metadata = { title: "Set New Password" };

export default function ResetPage({ searchParams }) {
  const token = searchParams?.token || "";
  const err = searchParams?.err;

  if (!token && err !== "expired") {
    return (
      <section className="section"><div className="container" style={{ maxWidth: 460 }}>
        <h1>Reset link invalid</h1>
        <p className="meta">This link is missing or invalid. <Link href="/account/forgot">Request a new one</Link>.</p>
      </div></section>
    );
  }

  return (
    <section className="section"><div className="container" style={{ maxWidth: 460 }}>
      <h1>Set a new password</h1>
      {err === "expired" ? <div className="notice" style={{ marginBottom: 14, background: "rgba(179,38,30,0.12)", borderColor: "#7a2a25", color: "#ffb4ad" }}>That reset link is invalid or expired. <Link href="/account/forgot">Request a new one</Link>.</div> : null}
      {err === "fields" ? <div className="notice" style={{ marginBottom: 14, background: "rgba(179,38,30,0.12)", borderColor: "#7a2a25", color: "#ffb4ad" }}>Password must be at least 6 characters.</div> : null}
      {token ? (
        <form action={performPasswordReset} className="form" style={{ maxWidth: "none" }}>
          <input type="hidden" name="token" value={token} />
          <label>New password</label>
          <input name="password" type="password" required minLength={6} placeholder="At least 6 characters" />
          <button className="btn" type="submit">Update Password</button>
        </form>
      ) : null}
    </div></section>
  );
}
