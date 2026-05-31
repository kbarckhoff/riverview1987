import "./globals.css";
import site from "@/lib/site-config";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export const metadata = {
  title: `${site.schoolName} Class of ${site.classYear} Reunion`,
  description: site.tagline,
};

// Turn the theme config into CSS variable overrides applied to :root.
function themeVars() {
  const t = site.theme;
  return `:root{--primary:${t.primary};--accent:${t.accent};--bg:${t.bg};--surface:${t.surface};--text:${t.text};--muted:${t.muted};}`;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeVars() }} />
        {/* Leaflet stylesheet for the "Where Are They Now" map */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
