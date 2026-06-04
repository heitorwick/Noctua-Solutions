/* global React */
// ============================================================
// NOCTUA — iconography (owl mark, service & utility icons, socials)
// Line icons, 1.7 stroke, inherit currentColor.
// ============================================================
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };

// Minimalist geometric owl — echoes the Noctua logo
function OwlMark({ size = 64, style }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={style} aria-hidden="true">
      <defs>
        <linearGradient id="owlg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#owlg)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        {/* ear tufts */}
        <path d="M30 30 C24 18 22 12 27 9 C32 12 35 19 36 27" />
        <path d="M70 30 C76 18 78 12 73 9 C68 12 65 19 64 27" />
        {/* head / face outline */}
        <path d="M50 17 C70 17 82 30 82 50 C82 72 68 88 50 88 C32 88 18 72 18 50 C18 30 30 17 50 17 Z" style={{ strokeWidth: "4px" }} />
        {/* brow bridge */}
        <path d="M50 40 L50 60" />
        {/* eyes */}
        <circle cx="36" cy="48" r="11.5" />
        <circle cx="64" cy="48" r="11.5" />
        {/* beak */}
        <path d="M45 64 L50 74 L55 64 Z" fill="url(#owlg)" stroke="none" />
      </g>
      {/* pupils */}
      <circle cx="36" cy="48" r="3.4" fill="var(--accent-2)" />
      <circle cx="64" cy="48" r="3.4" fill="var(--accent-2)" />
    </svg>);

}

// ---- service icons ----
const IconClean = (p) =>
<svg viewBox="0 0 24 24" {...S} {...p}>
    <path d="M9 3l1.5 4.5L15 9l-4.5 1.5L9 15l-1.5-4.5L3 9l4.5-1.5L9 3z" />
    <path d="M17.5 13l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" />
  </svg>;

const IconBuild = (p) =>
<svg viewBox="0 0 24 24" {...S} {...p}>
    <rect x="4" y="3" width="10" height="18" rx="2" />
    <path d="M7 7h4M7 11h4M7 15h2" />
    <path d="M17 9l3 0M18.5 7.5v3M17 16l3 0M18.5 14.5v3" />
  </svg>;

const IconMaint = (p) =>
<svg viewBox="0 0 24 24" {...S} {...p}>
    <path d="M14.7 6.3a4 4 0 00-5.4 5.4l-5.6 5.6a1.6 1.6 0 002.3 2.3l5.6-5.6a4 4 0 005.4-5.4l-2.5 2.5-2.1-.4-.4-2.1 2.7-2.3z" />
  </svg>;


// ---- utility / check / chips ----
const Check = (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M20 6L9 17l-5-5" /></svg>;
const Arrow = (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
const Shield = (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /><path d="M9.5 12l1.8 1.8L15 10" /></svg>;
const Bolt = (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z" /></svg>;
const Cpu = (p) => <svg viewBox="0 0 24 24" {...S} {...p}><rect x="7" y="7" width="10" height="10" rx="1.5" /><path d="M10 4v3M14 4v3M10 17v3M14 17v3M4 10h3M4 14h3M17 10h3M17 14h3" /></svg>;
const Disk = (p) => <svg viewBox="0 0 24 24" {...S} {...p}><rect x="3" y="6" width="18" height="5" rx="1.5" /><rect x="3" y="13" width="18" height="5" rx="1.5" /><path d="M7 8.5h0M7 15.5h0" /></svg>;
const Monitor = (p) => <svg viewBox="0 0 24 24" {...S} {...p}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>;
const Pin = (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>;

// ---- brand / social ----
const Whatsapp = (p) =>
<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...p}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.15h-.01a8.2 8.2 0 01-4.18-1.15l-.3-.18-3.11.82.83-3.03-.2-.31a8.2 8.2 0 01-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
  </svg>;

const Instagram = (p) => <svg viewBox="0 0 24 24" {...S} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" /></svg>;
const Facebook = (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M14 8.5V7c0-1 .5-1.5 1.6-1.5H17V2.5h-2.4C11.8 2.5 11 4 11 6.4v2.1H8.6V12H11v9.5h3V12h2.3l.5-3.5H14z" fill="currentColor" stroke="none" /></svg>;
const TikTok = (p) => <svg viewBox="0 0 24 24" {...p} fill="currentColor"><path d="M16.5 2c.3 2.1 1.5 3.8 3.5 4.2v3c-1.3.1-2.5-.2-3.6-.8v6.1c0 3.5-2.8 6.1-6.1 5.7-2.9-.3-5.1-2.8-5-5.7.1-2.8 2.3-5.1 5.1-5.3.4 0 .8 0 1.2.1v3.1c-.4-.1-.8-.2-1.2-.1-1.3.2-2.2 1.3-2.1 2.6.1 1.2 1.1 2.2 2.4 2.2 1.4 0 2.4-1.1 2.4-2.5V2h3.4z" /></svg>;
const Menu = (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
const Close = (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>;

Object.assign(window, {
  OwlMark, IconClean, IconBuild, IconMaint,
  Check, Arrow, Shield, Bolt, Cpu, Disk, Monitor, Pin,
  Whatsapp, Instagram, Facebook, TikTok, Menu, Close
});