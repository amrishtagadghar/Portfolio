CREATE TABLE IF NOT EXISTS case_studies (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  excerpt TEXT NOT NULL,
  disciplines TEXT[] NOT NULL DEFAULT '{}',
  industry TEXT NOT NULL,
  year INTEGER NOT NULL,
  role TEXT NOT NULL,
  timeline TEXT NOT NULL,
  tools TEXT[] NOT NULL DEFAULT '{}',
  cover_image TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  problem TEXT NOT NULL,
  goals TEXT[] NOT NULL DEFAULT '{}',
  process TEXT[] NOT NULL DEFAULT '{}',
  highlights TEXT[] NOT NULL DEFAULT '{}',
  deliverables TEXT[] NOT NULL DEFAULT '{}',
  results TEXT[] NOT NULL DEFAULT '{}',
  learnings TEXT[] NOT NULL DEFAULT '{}',
  metrics JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS articles (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  published_at DATE NOT NULL,
  reading_time TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  content TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS play_items (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('WIP', 'Shipped')),
  tags TEXT[] NOT NULL DEFAULT '{}',
  date DATE NOT NULL,
  cover_media TEXT NOT NULL,
  content TEXT[] NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_case_studies_year ON case_studies(year DESC);
CREATE INDEX IF NOT EXISTS idx_case_studies_featured ON case_studies(featured);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_play_items_date ON play_items(date DESC);
