CREATE TABLE IF NOT EXISTS submissions (
  id          TEXT    PRIMARY KEY,
  timestamp   TEXT    NOT NULL,
  company     TEXT    DEFAULT 'Unknown',
  email       TEXT    DEFAULT '',
  phone       TEXT    DEFAULT '',
  budget      TEXT    DEFAULT '',
  deliverables TEXT   DEFAULT '',
  status      TEXT    DEFAULT 'new',
  is_read     INTEGER DEFAULT 0,
  data        TEXT    NOT NULL
);
