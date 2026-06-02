// =============================================================
//  EDIT EVERYTHING ABOUT YOUR REUNION HERE.
//  This is the one file you change to re-theme the whole site.
// =============================================================

export const site = {
  // ---- Identity ----
  schoolName: "Riverview High School",
  classYear: "1987",
  mascot: "Raiders",
  cityState: "Riverview",
  tagline: "Still Raiders.",

  // Logo shown in the nav + hero. Drop your real logo PNG in `public/` and
  // point to it here (e.g. "/raiders-flag.png").
  logo: "/logo-flag.svg",

  // Big background photo at the top of the home page (the Oaks marquee).
  // Drop your photo in public/gallery and point here. Fades to black on the right.
  heroImage: "/gallery/oaks-marquee.jpg",

  // ---- Reunion event details (from the Save the Date) ----
  event: {
    name: "Riverview High School Class of 1987 Reunion",
    date: "Friday, April 2, 2027",
    time: "7:00 PM",
    venue: "The Historic Oaks Theater",
    // Used by the live countdown. Format: YYYY-MM-DDTHH:MM:SS (local time).
    dateISO: "2027-04-02T19:00:00",
    rsvpUrl: "", // optional: paste an Eventbrite / Google Form link to enable RSVP buttons
  },

  // ---- Theme colors (Raiders black & gold) ----
  theme: {
    primary: "#f4c20d",   // gold — buttons, accents, highlights
    accent: "#f4c20d",    // gold — links, arrows
    bg: "#0b0b0b",        // near-black page background
    surface: "#161616",   // cards
    text: "#f3f3f3",      // body text
    muted: "#9a9a9a",     // secondary text
  },

  // ---- Homepage collage (Summit-style mosaic) ----
  // These point at your uploaded photos in public/gallery/. Swap any filename
  // for another from that folder, or add your own.
  collage: [
    "/gallery/raiders-1.jpg",
    "/gallery/raiders-4.jpg",
    "/gallery/raiders-8.jpg",
    "/gallery/raiders-12.jpg",
    "/gallery/raiders-16.jpg",
    "/gallery/raiders-22.jpg",
    "/gallery/raiders-28.jpg",
    "/gallery/raiders-34.jpg",
  ],

  // ---- Footer ----
  contactEmail: "reunion@riverview1987.com",

  // ---- Accommodations (Hotels tab) ----
  venueAddress: "310 Allegheny River Blvd, Oakmont, PA 15139",
  lodging: {
    searchLocation: "Oakmont, PA",
    checkin: "2027-04-02",
    checkout: "2027-04-04",
  },

  // Paste full Spotify / Apple Music playlist share links to embed players on /soundtrack.
  spotifyPlaylistUrl: "https://open.spotify.com/playlist/0ZDdNsg8jR0zqn4iAfJt7v",
  appleMusicPlaylistUrl: "https://music.apple.com/us/playlist/soundtrack-of-87-riverview-class-of-1987/pl.u-PDb4Ye4sLk5Jd8l",

  // ---- Feature toggles ----
  // If true, anyone visiting the site can post to the Classmates Feed.
  allowPublicPosts: true,

  // Emails that automatically become site admins when they register.
  adminEmails: [
    "barckhoff@att.net",
  ],

  // ---- Map default view for "Where Are They Now" ----
  map: {
    center: [39.5, -98.35],
    zoom: 4,
  },
};

export default site;
