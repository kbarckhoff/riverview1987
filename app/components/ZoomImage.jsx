"use client";

import { useState } from "react";

export default function ZoomImage({ src, alt, className }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={className} src={src} alt={alt} loading="lazy" style={{ cursor: "zoom-in" }} onClick={() => setOpen(true)} />
      {open ? (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <button className="lightbox-close" type="button" aria-label="Close" onClick={() => setOpen(false)}>×</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
        </div>
      ) : null}
    </>
  );
}
