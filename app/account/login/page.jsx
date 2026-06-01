import Link from "next/link";
import { loginAccount } from "../actions";

export const metadata = { title: "Log In" };

export default function LoginPage({ searchParams }) {
  const err = searchParams?.err;
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 460 }}>
        <h1>Log in</h1>
        {err ? <div className="notice" style={{ marginBottom: 14, background: "rgba(179,38,30,0.12)", borderColor: "#7a2a25", color: "#ffb4ad" }}>Email or password was incorrect.</div> : null}
        <form action={loginAccount} className="form" style={{ maxWidth: "none" }}>
          <label>Email</label>
          <input name="email" type="email" required placeholder="you@example.com" />
          <label>Password</label>
          <input name="password" type="password" required />
          <button className="btn" type="submit">Log In</button>
        </form>
        <p className="meta" style={{ marginTop: 14 }}>
          New here? <Link href="/account/register">Create an account</Link>
        </p>
        <p className="meta" style={{ marginTop: 4 }}>
          <Link href="/account/forgot">Forgot password?</Link>
        </p>
      </div>
    </section>
  );
}
