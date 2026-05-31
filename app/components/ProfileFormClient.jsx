"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveProfile } from "../actions";
import { compressImage } from "./imageCompress";

export default function ProfileFormClient({ profile }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setBusy(true); setMsg(null);
    try {
      const fd = new FormData(form);
      const tf = fd.get("photo_then");
      const nf = fd.get("photo_now");
      if (tf && tf.size) fd.set("photo_then", await compressImage(tf)); else fd.delete("photo_then");
      if (nf && nf.size) fd.set("photo_now", await compressImage(nf)); else fd.delete("photo_now");
      await saveProfile(fd);
      setMsg({ ok: true, t: "Saved! Your profile is live below." });
      router.refresh();
    } catch (err) {
      setMsg({ ok: false, t: "Couldn't save — " + (err?.message || "please try again.") });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="form" style={{ maxWidth: "none" }}>
      <label>Full name *</label>
      <input name="full_name" required defaultValue={profile?.full_name || ""} placeholder="Your name" />
      <div className="two-col">
        <div><label>Maiden name</label><input name="maiden_name" defaultValue={profile?.maiden_name || ""} placeholder="(if applicable)" /></div>
        <div><label>City &amp; state</label><input name="current_city" defaultValue={profile?.current_city || ""} placeholder="Austin, TX" /></div>
      </div>
      <label>What you do</label>
      <input name="occupation" defaultValue={profile?.occupation || ""} placeholder="Occupation / what you're up to" />
      <label>About you</label>
      <textarea name="bio" defaultValue={profile?.bio || ""} placeholder="Share an update or a favorite RHS memory." />
      <div className="two-col">
        <div><label>Senior photo (then)</label><input type="file" name="photo_then" accept="image/*" /></div>
        <div><label>Current photo (now)</label><input type="file" name="photo_now" accept="image/*" /></div>
      </div>
      <button className="btn" type="submit" disabled={busy}>{busy ? "Saving…" : profile ? "Save Changes" : "Add Me to the Directory"}</button>
      {msg ? <p className="meta" style={{ color: msg.ok ? "var(--accent)" : "#ff8f86", marginTop: 10 }}>{msg.t}</p> : null}
    </form>
  );
}
