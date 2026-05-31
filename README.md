# Class Reunion Website

A Next.js (App Router) + React site for a high school class reunion, backed by
PostgreSQL (Neon in production, managed locally with pgAdmin). Same stack as your
other projects: **GitHub → Vercel → GoDaddy domain → Neon Postgres**.

## Pages

| Page | Route | What it does |
|------|-------|--------------|
| Home | `/` | Hero, event details, links to every section |
| Classmates Directory | `/classmates` | Then & now photos, bios, where everyone landed |
| Where Are They Now | `/where-are-they-now` | Interactive Leaflet map of classmate locations |
| Memorials | `/memorials` | Honors classmates who have passed |
| Flashback | `/flashback` | Throwback photo gallery |
| Classmates Feed | `/feed` | Posts/updates (public posting toggle in config) |
| **Organizer Dashboard** | `/admin` | Password-protected. Add/delete everything here. |

Data model: **the organizer adds everyone** from the dashboard. There's a single
admin password — no per-classmate logins to manage.

---

## 1. Make it yours (1 file)

Open `lib/site-config.js` and edit the school name, class year, mascot, event
date/venue, theme colors, and map center. Everything on the site reads from here.

---

## 2. Run it locally

```bash
npm install
cp .env.example .env.local      # then fill in the values (see below)
npm run db:setup                # creates tables + loads sample data
npm run dev                     # http://localhost:3000
```

`npm run db:setup -- --no-seed` creates the tables without the sample rows.

### Environment variables (`.env.local`)

```
DATABASE_URL=postgresql://...        # your Neon pooled connection string
ADMIN_PASSWORD=your-strong-password  # what you type at /admin/login
ADMIN_SECRET=<random 32+ char string># run: openssl rand -hex 32
```

---

## 3. Set up the database (Neon)

1. Create a free project at <https://neon.tech>.
2. In the Neon dashboard open **Connection Details** and copy the **Pooled**
   connection string. Paste it as `DATABASE_URL` in `.env.local`.
3. Run `npm run db:setup` to create the tables.

### Using pgAdmin

Neon is just hosted Postgres, so you can manage it in pgAdmin exactly like your
6QD database:

- In pgAdmin: **Register → Server**.
- **Connection** tab: Host = the part after `@` and before `/` in your Neon
  string (e.g. `ep-xxxx-pooler.us-east-2.aws.neon.tech`), Port `5432`,
  Maintenance DB = your db name, Username/Password from the connection string.
- **Parameters** tab: add `SSL mode = require`.

You can then browse tables, run queries, and edit rows by hand. (You can also
paste `db/schema.sql` into pgAdmin's Query Tool instead of running the setup
script.)

> Note: your **local** pgAdmin Postgres is fine for development, but Vercel can't
> reach it in production — that's why the live site uses Neon. You can still point
> pgAdmin at the Neon database to manage it.

---

## 4. Push to GitHub

```bash
git init
git add .
git commit -m "Class reunion site"
git branch -M main
git remote add origin https://github.com/<you>/class-reunion.git
git push -u origin main
```

`.env.local` is gitignored — your secrets never get committed.

---

## 5. Deploy to Vercel

1. <https://vercel.com> → **Add New → Project** → import the GitHub repo.
2. Framework preset: **Next.js** (auto-detected).
3. **Environment Variables** → add `DATABASE_URL`, `ADMIN_PASSWORD`, and
   `ADMIN_SECRET` (same values as `.env.local`).
4. **Deploy.** Every future `git push` redeploys automatically.

> Tip: Vercel can provision Neon for you under **Storage → Create Database →
> Neon**, which auto-injects `DATABASE_URL`. After that, run the SQL in
> `db/schema.sql` once (via pgAdmin or Neon's SQL editor) to create the tables.

---

## 6. Connect your GoDaddy domain

1. In Vercel: **Project → Settings → Domains → Add** your domain (e.g.
   `class2005reunion.com`). Vercel shows the DNS records to set.
2. In GoDaddy: **My Products → Domain → DNS → Manage Zones**:
   - For the apex/root domain, add an **A record**: Host `@` → `76.76.21.21`.
   - For `www`, add a **CNAME**: Host `www` → `cname.vercel-dns.com`.
   *(Use whatever exact values Vercel displays — they occasionally change.)*
3. Back in Vercel, click **Refresh** until the domain shows **Valid**. SSL is
   issued automatically. DNS can take a few minutes to a few hours.

---

## 7. Day-to-day: adding content

Go to `/admin`, log in with `ADMIN_PASSWORD`, and use the dashboard to add
classmates, memorials, feed posts, and flashback photos. Changes appear on the
public site immediately.

**Putting someone on the map:** when adding a classmate, paste their city's
latitude & longitude (search e.g. "Austin TX lat long"). Classmates without
coordinates simply don't appear on the map.

**Feed posting:** by default anyone can post to the feed. To make it
organizer-only, set `allowPublicPosts: false` in `lib/site-config.js`.

---

## Tech notes

- **Next.js 14 App Router**, React 18, server components for all reads.
- **Server Actions** handle every write (no separate API layer).
- **`pg`** connection pool in `lib/db.js` (SSL on for Neon).
- **Auth**: single admin password → signed httpOnly cookie, enforced by
  `middleware.js` on `/admin/*` and re-checked in every write action.
- **Map**: Leaflet + free OpenStreetMap tiles (no API key needed).
- **Photos** are referenced by URL. To add direct file uploads later, drop in
  Vercel Blob or Cloudinary.

## Project layout

```
app/
  page.jsx                  Home
  classmates/page.jsx       Directory
  where-are-they-now/       Map (page.jsx + Map.jsx client component)
  memorials/page.jsx
  flashback/page.jsx
  feed/page.jsx
  actions.js                Public feed post action
  admin/                    Dashboard, login, per-section managers, actions.js
  components/               Nav, Footer, Avatar
lib/
  site-config.js            EDIT THIS to theme the site
  db.js  data.js  auth.js  format.js
db/
  schema.sql  seed.sql
scripts/
  setup-db.js
middleware.js               Protects /admin
```
