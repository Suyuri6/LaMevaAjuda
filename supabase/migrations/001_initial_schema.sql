-- Enum types
CREATE TYPE government_level AS ENUM ('generalitat', 'estado', 'local', 'eu');
CREATE TYPE employment_status AS ENUM ('employed', 'unemployed', 'self_employed', 'student', 'retired');
CREATE TYPE family_situation AS ENUM ('single', 'married', 'domestic_partner', 'single_parent', 'widowed', 'divorced');
CREATE TYPE housing_situation AS ENUM ('owner', 'renter', 'shared', 'family_home', 'homeless', 'other');
CREATE TYPE immigration_status AS ENUM ('citizen', 'eu_national', 'permanent_resident', 'temporary_resident', 'refugee', 'undocumented');
CREATE TYPE comparison_op AS ENUM ('eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in', 'between');

-- Core aids table
CREATE TABLE aids (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT UNIQUE NOT NULL,
  government    government_level NOT NULL,
  category      TEXT NOT NULL,
  amount_text   JSONB NOT NULL DEFAULT '{}',
  official_url  JSONB NOT NULL DEFAULT '{}',
  is_active     BOOLEAN DEFAULT true,
  valid_from    DATE,
  valid_until   DATE,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Translations for aids
CREATE TABLE aid_translations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aid_id        UUID REFERENCES aids(id) ON DELETE CASCADE,
  locale        TEXT NOT NULL CHECK (locale IN ('ca', 'es', 'en')),
  name          TEXT NOT NULL,
  short_desc    TEXT NOT NULL,
  description   TEXT NOT NULL,
  eligibility_summary TEXT NOT NULL,
  how_to_apply  TEXT,
  UNIQUE(aid_id, locale)
);

-- Eligibility rules
CREATE TABLE eligibility_rules (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aid_id        UUID REFERENCES aids(id) ON DELETE CASCADE,
  field         TEXT NOT NULL,
  operator      comparison_op NOT NULL,
  value         JSONB NOT NULL,
  rule_group    INT DEFAULT 0
);

-- Municipalities reference
CREATE TABLE municipalities (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  comarca       TEXT NOT NULL,
  province      TEXT NOT NULL CHECK (province IN ('Barcelona', 'Girona', 'Lleida', 'Tarragona'))
);

-- Bulletin entries for automated ingestion
CREATE TABLE bulletin_entries (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source        TEXT NOT NULL,
  url           TEXT NOT NULL,
  title         TEXT NOT NULL,
  published_at  DATE,
  content       TEXT,
  processed     BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- AI-generated drafts for review
CREATE TABLE aid_drafts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aid_data      JSONB NOT NULL,
  source_entry  UUID REFERENCES bulletin_entries(id),
  status        TEXT NOT NULL DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'approved', 'rejected')),
  created_at    TIMESTAMPTZ DEFAULT now(),
  reviewed_at   TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_eligibility_rules_aid ON eligibility_rules(aid_id);
CREATE INDEX idx_aids_active ON aids(is_active) WHERE is_active = true;
CREATE INDEX idx_aid_translations_aid_locale ON aid_translations(aid_id, locale);
CREATE INDEX idx_bulletin_entries_processed ON bulletin_entries(processed) WHERE processed = false;
