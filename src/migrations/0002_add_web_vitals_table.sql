CREATE TABLE IF NOT EXISTS web_vitals (
    id INTEGER NOT NULL PRIMARY KEY,
    metric_id TEXT NOT NULL,
    metric_name TEXT NOT NULL,
    navigation_type TEXT NULL,
    rating TEXT NULL,
    value REAL NOT NULL,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%S.%sZ', 'now'))
);

