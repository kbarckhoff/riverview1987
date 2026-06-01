const ICONS = {
  people: (<><path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" /><circle cx="9" cy="7" r="3" /><path d="M22 19v-1a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>),
  pin: (<><path d="M12 21s-6-5.33-6-10a6 6 0 0 1 12 0c0 4.67-6 10-6 10z" /><circle cx="12" cy="11" r="2.3" /></>),
  heart: (<path d="M12 20s-7-4.5-9.3-9A5 5 0 0 1 12 5a5 5 0 0 1 9.3 6C19 15.5 12 20 12 20z" />),
  camera: (<><path d="M3 7h3l2-2h8l2 2h3v12H3z" /><circle cx="12" cy="13" r="3.2" /></>),
  chat: (<path d="M21 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />),
  gradcap: (<><path d="M2 8l10-4 10 4-10 4z" /><path d="M6 10v5c0 1.3 2.7 2.4 6 2.4s6-1.1 6-2.4v-5" /><line x1="22" y1="8" x2="22" y2="14" /></>),
  music: (<><path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" /></>),
};

export default function Icon({ name, size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name] || null}
    </svg>
  );
}
