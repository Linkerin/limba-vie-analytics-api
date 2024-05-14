import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import analytics from './routes/analytics';
import webVitals from './routes/web-vitals';

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

app.route('/analytics', analytics);
app.route('/web-vitals', webVitals);

export default {
  port: process.env.PORT ?? 8000,
  fetch: app.fetch
};
