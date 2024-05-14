CREATE TABLE IF NOT EXISTS analytics (
    id INTEGER NOT NULL PRIMARY KEY,
    pathname TEXT NOT NULL,
    os TEXT NULL,
    os_version TEXT NULL,
    engine TEXT NULL,
    engine_version TEXT NULL,
    device_type TEXT NULL,
    device_model TEXT NULL,
    device_vendor TEXT NULL,
    browser TEXT NULL,
    browser_version TEXT NULL,
    country TEXT NULL,
    city TEXT NULL,
    ip TEXT NULL,
    user_id TEXT NULL,
    bot INTEGER NULL CHECK(bot IN (0 ,1) ),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%S.%sZ', 'now'))
);

