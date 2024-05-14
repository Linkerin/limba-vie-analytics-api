import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import type { AnalyticsBody, QueryParamsRecord, WebVitalsBody } from './types';
import createDB from './db';

const ALLOWED_ORIGINS = ['https://limba.vercel.app', 'http://localhost:3000'];

const app = new Hono().basePath('/api');

// middleware
app.use(logger());
app.use('*', cors({ origin: ALLOWED_ORIGINS }));
app.use(async (c, next) => {
  const origin = c.req.header('origin');
  if (
    (origin && ALLOWED_ORIGINS.includes(origin)) ||
    c.req.header('x-middleware-subrequest') === 'middleware'
  ) {
    await next();
  } else {
    c.res = new Response('Forbidden', { status: 403 });
  }
});

app.get('/ping', c => {
  return c.text('Pong!');
});

app.post('/analytics', async c => {
  const body = await c.req.json<AnalyticsBody>();

  const params: QueryParamsRecord<AnalyticsBody> = Object.fromEntries(
    Object.entries(body).map(([key, value]) => [`$${key}`, value])
  );

  const { db, queries } = createDB();
  queries.createAnalyticsRecord.run(params);
  db.close(false);

  return c.text('OK');
});

app.post('/web-vitals', async c => {
  const body = await c.req.json<WebVitalsBody>();

  const params: QueryParamsRecord<WebVitalsBody> = Object.fromEntries(
    Object.entries(body).map(([key, value]) => [`$${key}`, value])
  );

  const { db, queries } = createDB();
  queries.createWebVitalsRecord.run(params);
  db.close(false);

  return c.text('OK');
});

export default {
  port: process.env.PORT ?? 5500,
  fetch: app.fetch
};
