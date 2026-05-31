const ICONS = {
  people: (
    <>
      <path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" />
      <circle cx="9" cy="7" r="3" />
      <path d="M22 19v-1a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6-5.33-6-10a6 6 0 0 1 12 0c0 4.67-6 10-6 10z" />
      <circle cx="12" cy="11" r="2.3" />
    </>
  ),
  heart: (
    <path d="M12 20s-7-4.5-9.3-9A5 5 0 0 1 12 5a5 5 0 0 1 9.3 6C19 15.5 12 20 12 20z" />
  ),
  camera: (
    <>
      <path d="M3 7h3l2-2h8l2 2h3v12H3z" />
      <circle cx="12" cy="13" r="3.2" />
    </>
  ),
  chat: (
    <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
  ),
};

export default function Icon({ name, size = 30 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name] || null}
    </svg>
  );
}
