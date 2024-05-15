import { Hono } from 'hono';

import { WebVitalsBody } from '../lib/types';
import prisma from '../lib/prisma';

const app = new Hono();

app.post('/', async c => {
  try {
    const body = await c.req.json<WebVitalsBody>();
    for (const [key, value] of Object.entries(body)) {
      if (!value) {
        throw new TypeError(`Value for '${key}' was not provided`);
      }
    }

    console.log(body.location);
    delete body.location;

    await prisma.webVitals.create({ data: body });

    return c.json({ success: true }, 201);
  } catch (error) {
    console.error(error);

    if (error instanceof TypeError) {
      return c.json({ success: false, message: error.message }, 400);
    }

    return c.json(
      {
        success: false,
        message: 'Error occured during recording web vitals data'
      },
      500
    );
  } finally {
    await prisma.$disconnect();
  }
});

const webVitals = app;

export default webVitals;
