function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

export default function Avatar({ name, url }) {
  if (url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="avatar" src={url} alt={name} />;
  }
  return <div className="avatar-fallback">{initials(name)}</div>;
}
