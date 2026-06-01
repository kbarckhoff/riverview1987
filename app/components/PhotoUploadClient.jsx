"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postGalleryPhoto } from "../actions";
import { compressImage } from "./imageCompress";

export default function PhotoUploadClient({
  category = "flashback",
  title = "Share a photo",
  buttonText = "Post to Gallery",
  captionPlaceholder = "Say something about it",
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setBusy(true); setMsg(null);
    try {
      const fd = new FormData(form);
      const pf = fd.get("photo");
      if (!pf || !pf.size) { setMsg({ ok: false, t: "Choose a photo first." }); setBusy(false); return; }
      fd.set("photo", await compressImage(pf));
      await postGalleryPhoto(fd);
      form.reset();
      setMsg({ ok: true, t: "Posted!" });
      router.refresh();
    } catch (err) {
      setMsg({ ok: false, t: "Couldn't post — " + (err?.message || "try again.") });
    } finally { setBusy(false); }
  }

  return (
    <form onSubmit={onSubmit} className="form" style={{ maxWidth: 640, margin: "0 auto 30px" }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <input type="hidden" name="category" value={category} />
      <label>Photo</label>
      <input type="file" name="photo" accept="image/*" required />
      <label>Caption</label>
      <input name="caption" placeholder={captionPlaceholder} />
      <button className="btn" type="submit" disabled={busy}>{busy ? "Posting…" : buttonText}</button>
      {msg ? <p className="meta" style={{ color: msg.ok ? "var(--accent)" : "#ff8f86", marginTop: 10 }}>{msg.t}</p> : null}
    </form>
  );
}
