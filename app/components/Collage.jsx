import site from "@/lib/site-config";

// Tile size pattern that creates a Summit-style mosaic. Repeats if there are
// more photos than entries here.
const PATTERN = ["wide", "", "tall", "", "", "wide", "", "tall"];

export default function Collage() {
  const photos = site.collage || [];
  if (photos.length === 0) return null;

  return (
    <div className="collage">
      {photos.map((src, i) => (
        <div className={`tile ${PATTERN[i % PATTERN.length]}`} key={i}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={`${site.schoolName} memory ${i + 1}`} loading="lazy" />
        </div>
      ))}
      <div className="collage-overlay">
        <h2 className="display">{site.schoolName}</h2>
        <span className="est">Class of {site.classYear}</span>
      </div>
    </div>
  );
}
