"use client";

import { useEffect, useRef } from "react";

export default function Map({ points = [], center = [39.5, -98.35], zoom = 4, accent = "#c8a04a" }) {
  const elRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // Import Leaflet only in the browser (it touches `window`).
      const L = (await import("leaflet")).default;
      if (cancelled || !elRef.current || mapRef.current) return;

      const map = L.map(elRef.current).setView(center, zoom);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      points.forEach((p) => {
        if (p.lat == null || p.lng == null) return;
        L.circleMarker([p.lat, p.lng], {
          radius: 8,
          color: accent,
          fillColor: accent,
          fillOpacity: 0.85,
          weight: 2,
        })
          .addTo(map)
          .bindPopup(
            `<strong>${p.full_name}</strong>${p.current_city ? `<br/>${p.current_city}` : ""}`
          );
      });
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [points, center, zoom, accent]);

  return <div ref={elRef} className="map-wrap" />;
}
