import site from "@/lib/site-config";
import { login } from "../actions";

export const metadata = { title: "Organizer Login" };

export default function LoginPage({ searchParams }) {
  const error = searchParams?.error;
  return (
    <section className="section">
      <div className="container">
        <h1>Organizer Login</h1>
        <p className="meta" style={{ marginBottom: 20 }}>
          {site.schoolName} Class of {site.classYear} — admin access only.
        </p>
        {error && (
          <div className="notice" style={{ marginBottom: 16, background: "#fdecea", borderColor: "#f5c2c0", color: "#7a1c17" }}>
            Incorrect password. Try again.
          </div>
        )}
        <form action={login} className="form">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required autoFocus />
          <button className="btn btn-primary" type="submit">Log In</button>
        </form>
      </div>
    </section>
  );
}
