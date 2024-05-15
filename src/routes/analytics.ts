import { Hono } from 'hono';

import { AnalyticsBody } from '../lib/types';
import prisma from '../lib/prisma';

const app = new Hono();

app.post('/', async c => {
  try {
    const body = await c.req.json<AnalyticsBody>();
    if (!body.pathname) {
      throw new TypeError("'pathname' value was not provided");
    }
    console.log(body.referer);
    delete body.referer;

    await prisma.analytics.create({ data: body });

    return c.json({ success: true }, 201);
  } catch (error) {
    console.error(error);

    if (error instanceof TypeError) {
      return c.json({ success: false, message: error.message }, 400);
    }

    return c.json(
      {
        success: false,
        message: 'Error occured during recording analytics data'
      },
      500
    );
  } finally {
    await prisma.$disconnect();
  }
});

const analytics = app;

export default analytics;
