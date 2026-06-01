import Link from "next/link";
import { requestPasswordReset } from "../actions";

export const metadata = { title: "Forgot Password" };

export default function ForgotPage({ searchParams }) {
  const sent = searchParams?.sent;
  return (
    <section className="section"><div className="container" style={{ maxWidth: 460 }}>
      <h1>Reset your password</h1>
      {sent ? (
        <div className="notice" style={{ marginBottom: 14 }}>
          If an account exists for that email, we&apos;ve sent a reset link. Check your inbox (and spam folder).
        </div>
      ) : (
        <p className="meta" style={{ marginBottom: 16 }}>Enter your email and we&apos;ll send you a link to set a new password.</p>
      )}
      <form action={requestPasswordReset} className="form" style={{ maxWidth: "none" }}>
        <label>Email</label>
        <input name="email" type="email" required placeholder="you@example.com" />
        <button className="btn" type="submit">Send Reset Link</button>
      </form>
      <p className="meta" style={{ marginTop: 14 }}><Link href="/account/login">Back to log in</Link></p>
    </div></section>
  );
}
