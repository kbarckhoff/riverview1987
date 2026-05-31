-- ===========================================================
--  Class Reunion database schema (PostgreSQL)
--  Run this once: `npm run db:setup` (or paste into pgAdmin).
-- ===========================================================

CREATE TABLE IF NOT EXISTS classmates (
  id            SERIAL PRIMARY KEY,
  full_name     TEXT NOT NULL,
  maiden_name   TEXT,
  occupation    TEXT,
  bio           TEXT,
  current_city  TEXT,
  lat           DOUBLE PRECISION,
  lng           DOUBLE PRECISION,
  photo_then_url TEXT,
  photo_now_url  TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS memorials (
  id          SERIAL PRIMARY KEY,
  full_name   TEXT NOT NULL,
  birth_year  INTEGER,
  passed_year INTEGER,
  tribute     TEXT,
  photo_url   TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS feed_posts (
  id         SERIAL PRIMARY KEY,
  author     TEXT NOT NULL,
  body       TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS flashback_photos (
  id         SERIAL PRIMARY KEY,
  caption    TEXT,
  image_url  TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Uploaded images live here (served via /api/photo/[id]).
CREATE TABLE IF NOT EXISTS photos (
  id         SERIAL PRIMARY KEY,
  mime       TEXT NOT NULL,
  data       BYTEA NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_classmates_name ON classmates (full_name);
CREATE INDEX IF NOT EXISTS idx_feed_created ON feed_posts (created_at DESC);
