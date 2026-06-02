"use client";

import { useState } from "react";
import site from "@/lib/site-config";

export default function Collage() {
  const photos = site.collage || [];
  const [open, setOpen] = useState(null);
  if (photos.length === 0) return null;

  return (
    <>
      <div className="collage">
        {photos.map((src, i) => (
          <button className="tile" key={i} type="button" onClick={() => setOpen(src)} aria-label="View photo larger">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`${site.schoolName} memory ${i + 1}`} loading="lazy" />
          </button>
        ))}
        <div className="collage-overlay">
          <h2 className="display">{site.schoolName}</h2>
          <span className="est">Class of {site.classYear}</span>
        </div>
      </div>

      {open ? (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <button className="lightbox-close" type="button" aria-label="Close" onClick={() => setOpen(null)}>×</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={open} alt="Expanded photo" onClick={(e) => e.stopPropagation()} />
        </div>
      ) : null}
    </>
  );
}
