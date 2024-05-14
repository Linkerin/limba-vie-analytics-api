import { Database } from 'bun:sqlite';
import { migrate, getMigrations } from 'bun-sqlite-migrations';

const queries = {
  createAnalyticsRecord: `INSERT INTO analytics (
    pathname, os, os_version, engine, engine_version,
    device_type, device_model, device_vendor,
    browser, browser_version, country, city,
    ip, user_id, bot
  )
  VALUES (
    $pathname, $os, $osVersion, $engine, $engineVersion,
    $deviceType, $deviceModel, $deviceVendor,
    $browser, $browserVersion, $country, $city,
    $ip, $userId, $isBot
  )`,
  createWebVitalsRecord: `INSERT INTO web_vitals  (
    metric_id, metric_name, navigation_type, rating, value
  )
  VALUES (
    $metricId, $metricName, $navigationType, $rating, $value
  )`
};

const createDB = () => {
  const db = new Database('limba-db.sqlite', { create: true });
  migrate(db, getMigrations(import.meta.dir + '/migrations'));
  db.exec('PRAGMA journal_mode = WAL;');

  const createAnalyticsRecord = db.prepare(queries.createAnalyticsRecord);
  const createWebVitalsRecord = db.prepare(queries.createWebVitalsRecord);

  return { queries: { createAnalyticsRecord, createWebVitalsRecord }, db };
};

export default createDB;
