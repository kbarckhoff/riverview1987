-- ===========================================================
--  Riverview Raiders reunion schema (PostgreSQL)
--  Safe to re-run: everything uses IF NOT EXISTS.
-- ===========================================================

CREATE TABLE IF NOT EXISTS members (
  id            SERIAL PRIMARY KEY,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name          TEXT NOT NULL,
  is_admin      BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

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
  member_id     INTEGER REFERENCES members(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE classmates ADD COLUMN IF NOT EXISTS member_id INTEGER REFERENCES members(id) ON DELETE SET NULL;

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

-- Uploaded image bytes (served via /api/photo/[id])
CREATE TABLE IF NOT EXISTS photos (
  id         SERIAL PRIMARY KEY,
  mime       TEXT NOT NULL,
  data       BYTEA NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Gallery posts (each commentable/likeable). Static throwbacks get a row too.
CREATE TABLE IF NOT EXISTS gallery_posts (
  id         SERIAL PRIMARY KEY,
  member_id  INTEGER REFERENCES members(id) ON DELETE SET NULL,
  image_url  TEXT UNIQUE NOT NULL,
  caption    TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS comments (
  id          SERIAL PRIMARY KEY,
  post_id     INTEGER NOT NULL REFERENCES gallery_posts(id) ON DELETE CASCADE,
  member_id   INTEGER REFERENCES members(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  body        TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS likes (
  post_id   INTEGER NOT NULL REFERENCES gallery_posts(id) ON DELETE CASCADE,
  member_id INTEGER NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, member_id)
);

CREATE INDEX IF NOT EXISTS idx_classmates_name ON classmates (full_name);
CREATE INDEX IF NOT EXISTS idx_comments_post ON comments (post_id);

CREATE TABLE IF NOT EXISTS feed_replies (
  id          SERIAL PRIMARY KEY,
  post_id     INTEGER NOT NULL REFERENCES feed_posts(id) ON DELETE CASCADE,
  member_id   INTEGER REFERENCES members(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  body        TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_feed_replies_post ON feed_replies (post_id);


CREATE UNIQUE INDEX IF NOT EXISTS uniq_classmates_member ON classmates (member_id) WHERE member_id IS NOT NULL;
