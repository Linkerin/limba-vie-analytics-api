import { Hono } from 'hono';
import { UAParser } from 'ua-parser-js';

import { WebVitalsBody } from '../lib/types';
import prisma from '../lib/prisma';

const REQUIRED_KEYS: Array<keyof WebVitalsBody> = [
  'metricId',
  'metricName',
  'navigationType',
  'rating',
  'value'
];

const app = new Hono();

app.post('/', async c => {
  try {
    const body = await c.req.json<WebVitalsBody>();

    for (const key of REQUIRED_KEYS) {
      if (!body[key]) {
        throw new TypeError(`Value for '${key}' was not provided`);
      }
    }

    const parser = new UAParser(body.userAgent);
    const { browser, device, engine, os } = parser.getResult();

    console.log(browser, device, engine, os);

    await prisma.webVitals.create({
      data: {
        browser: browser.name,
        browserVersion: browser.version,
        engine: engine.name,
        engineVersion: engine.version,
        deviceModel: device.model,
        deviceType: device.type,
        deviceVendor: device.vendor,
        os: os.name,
        osVersion: os.version,
        ...body
      }
    });

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
