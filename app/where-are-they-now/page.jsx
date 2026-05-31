import site from "@/lib/site-config";
import { getClassmatesWithCoords } from "@/lib/data";
import Map from "./Map";

export const dynamic = "force-dynamic";

export const metadata = { title: "Where Are They Now" };

export default async function WhereAreTheyNowPage() {
  const points = await getClassmatesWithCoords();

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Where Are They Now</h1>
          <p>See where the Class of {site.classYear} has scattered across the map.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {points.length === 0 ? (
            <p className="empty">
              No locations on the map yet. Classmates appear here once an organizer adds their
              latitude &amp; longitude in the admin dashboard.
            </p>
          ) : (
            <>
              <Map
                points={points}
                center={site.map.center}
                zoom={site.map.zoom}
                accent={site.theme.accent}
              />
              <p className="meta" style={{ marginTop: 12 }}>
                {points.length} classmate{points.length === 1 ? "" : "s"} pinned. Click a dot to see who's there.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
