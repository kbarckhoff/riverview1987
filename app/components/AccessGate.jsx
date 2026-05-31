import { unlockAccess } from "../actions";

export default function AccessGate({ children, unlocked, title, blurb, redirectTo, badCode }) {
  if (unlocked) return children;
  return (
    <div className="form access-gate">
      <h3 style={{ marginTop: 0 }}>{title || "Classmates only"}</h3>
      <p className="meta" style={{ marginTop: 0 }}>
        {blurb || "Enter the class access code to add your info or post."}
      </p>
      {badCode ? (
        <div className="notice" style={{ marginBottom: 12, background: "rgba(179,38,30,0.12)", borderColor: "#7a2a25", color: "#ffb4ad" }}>
          That code didn&apos;t match. Try again.
        </div>
      ) : null}
      <form action={unlockAccess}>
        <input type="hidden" name="from" value={redirectTo || "/classmates"} />
        <label htmlFor="code">Access code</label>
        <input id="code" name="code" required placeholder="Class access code" autoComplete="off" />
        <button className="btn" type="submit">Unlock Posting</button>
      </form>
    </div>
  );
}
