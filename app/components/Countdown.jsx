"use client";

import { useEffect, useState } from "react";

function diff(target) {
  const ms = new Date(target).getTime() - Date.now();
  if (Number.isNaN(ms) || ms <= 0) return null;
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export default function Countdown({ target }) {
  // Start null so server and first client render match (avoids hydration mismatch).
  const [t, setT] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setT(diff(target));
    setReady(true);
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!ready) return <div className="countdown" aria-hidden="true" style={{ minHeight: 120 }} />;
  if (!t) return <p className="countdown-done">The day is here — see you at the reunion!</p>;

  const cells = [
    ["Days", t.days],
    ["Hours", t.hours],
    ["Minutes", t.minutes],
    ["Seconds", t.seconds],
  ];

  return (
    <div className="countdown" role="timer" aria-label="Time until the reunion">
      {cells.map(([label, value]) => (
        <div className="count-cell" key={label}>
          <div className="count-num">{String(value).padStart(2, "0")}</div>
          <span className="count-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
