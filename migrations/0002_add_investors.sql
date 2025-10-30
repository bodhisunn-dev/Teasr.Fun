
CREATE TABLE IF NOT EXISTS investors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  investment_amount TEXT NOT NULL,
  total_earnings TEXT NOT NULL DEFAULT '0',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(post_id, user_id),
  UNIQUE(post_id, position)
);

CREATE INDEX IF NOT EXISTS idx_investors_post_id ON investors(post_id);
CREATE INDEX IF NOT EXISTS idx_investors_user_id ON investors(user_id);
