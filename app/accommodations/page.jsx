import site from "@/lib/site-config";

export const metadata = { title: "Hotels & Accommodations" };

export default function AccommodationsPage() {
  const loc = encodeURIComponent(site.lodging?.searchLocation || "Oakmont, PA");
  const ci = site.lodging?.checkin || "";
  const co = site.lodging?.checkout || "";

  const platforms = [
    { name: "Hotels.com", url: `https://www.hotels.com/Hotel-Search?destination=${loc}&startDate=${ci}&endDate=${co}` },
    { name: "Expedia", url: `https://www.expedia.com/Hotel-Search?destination=${loc}&startDate=${ci}&endDate=${co}` },
    { name: "Booking.com", url: `https://www.booking.com/searchresults.html?ss=${loc}&checkin=${ci}&checkout=${co}` },
    { name: "Kayak", url: `https://www.kayak.com/hotels/${loc}/${ci}/${co}` },
    { name: "Airbnb", url: `https://www.airbnb.com/s/${loc}/homes?checkin=${ci}&checkout=${co}` },
    { name: "Google Hotels", url: `https://www.google.com/travel/search?q=hotels%20near%20${loc}` },
  ];

  const hotels = [
    { name: "Comfort Inn & Suites", area: "Oakmont", distance: "~1.4 mi" },
    { name: "Hampton Inn & Suites Pittsburgh/Harmarville", area: "Harmarville", distance: "~1.7 mi" },
    { name: "TownePlace Suites by Marriott Pittsburgh Harmarville", area: "Harmarville", distance: "~2 mi" },
    { name: "Holiday Inn Express Pittsburgh-North (Harmarville)", area: "Harmarville", distance: "~2 mi" },
  ];
  const mapsLink = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

  return (
    <>
      <div className="page-header"><div className="container">
        <h1>Hotels &amp; Accommodations</h1>
        <p>Where to stay for reunion weekend, near {site.venue} in Oakmont.</p>
      </div></div>

      <section className="section"><div className="container">
        <div className="savedate-grid" style={{ alignItems: "stretch" }}>
          <div className="event-box" style={{ margin: 0 }}>
            <h2 style={{ marginTop: 0 }}>The Venue</h2>
            <div className="row"><strong>Where</strong><span>{site.venue}</span></div>
            <div className="row"><strong>Address</strong><span>{site.venueAddress}</span></div>
            <div className="row"><strong>Dates</strong><span>{site.event.date}</span></div>
            <a className="btn btn-primary" style={{ marginTop: 14 }} target="_blank" rel="noreferrer"
               href={mapsLink(site.venueAddress)}>Open in Google Maps</a>
          </div>
          <div className="poster-frame" style={{ padding: 6 }}>
            <iframe
              title="Map to the Oaks Theater"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(site.venueAddress)}&z=13&output=embed`}
              style={{ width: "100%", height: "100%", minHeight: 280, border: 0, borderRadius: 8 }}
              loading="lazy"
            />
          </div>
        </div>
      </div></section>

      <section className="section" style={{ paddingTop: 0 }}><div className="container">
        <div className="section-head">
          <h2>Search Hotels &amp; Rentals</h2>
          <p>Each opens a live search near Oakmont for reunion weekend — compare prices and book directly.</p>
        </div>
        <div className="lodge-btns">
          {platforms.map((p) => (
            <a key={p.name} className="btn btn-outline" href={p.url} target="_blank" rel="noreferrer">{p.name}</a>
          ))}
        </div>
      </div></section>

      <section className="section" style={{ paddingTop: 0 }}><div className="container">
        <div className="section-head">
          <h2>Closest to the Oaks</h2>
          <p>A few of the nearest hotels. Tap to see them on the map and check rates.</p>
        </div>
        <div className="grid grid-3">
          {hotels.map((h) => (
            <a key={h.name} className="feature" href={mapsLink(`${h.name} ${h.area} PA`)} target="_blank" rel="noreferrer" style={{ display: "block" }}>
              <h3 style={{ margin: "0 0 6px" }}>{h.name}</h3>
              <p className="meta" style={{ margin: 0 }}>{h.area} · {h.distance} from the Oaks</p>
              <span style={{ color: "var(--accent)", fontWeight: 800 }}>View &amp; book →</span>
            </a>
          ))}
        </div>
        <p className="meta" style={{ marginTop: 18 }}>
          Distances are approximate. Booking is handled directly by each hotel or travel site — the reunion committee isn&apos;t affiliated with any of them.
        </p>
      </div></section>
    </>
  );
}
