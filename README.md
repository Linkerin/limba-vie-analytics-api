# Limba Vie Analytics API

## Overview

[Limba Vie](https://limba.vercel.app) backend API that is designed to collect
web vitals metrics and visits data.

## Technologies Used

- [Bun Runtime](https://bun.sh)
- [Hono](https://hono.dev) web framework
- [Prisma ORM](https://prisma.io) - object-relational mapper (ORM) for
  interacting with Postgres database
- [Postgres](https://www.postgresql.org/) - relational database

## Endpoints

### POST `/api/analytics`

Receives `JSON` with the application visit information.

**Parameters**:

| Key            | Type      | Required |
| -------------- | --------- | -------- |
| pathname       | `string`  | yes      |
| osVersion      | `string`  | no       |
| engine         | `string`  | no       |
| engineVersion  | `string`  | no       |
| deviceType     | `string`  | no       |
| deviceModel    | `string`  | no       |
| deviceVendor   | `string`  | no       |
| browser        | `string`  | no       |
| browserVersion | `string`  | no       |
| country        | `string`  | no       |
| city           | `string`  | no       |
| ip             | `string`  | no       |
| referer        | `string`  | no       |
| userId         | `string`  | no       |
| bot            | `boolean` | no       |

**Example**:

```json
POST /api/analytics
{
  "pathname": "/",
  "os": "Linux",
  "osVersion": "x86_64",
  "engine": "Blink",
  "engineVersion": "124.0.0.0",
  "deviceType": null,
  "deviceModel": null,
  "deviceVendor": null,
  "browser": "Chrome",
  "browserVersion": "124.0.0.0",
  "country": null,
  "city": null,
  "ip": null,
  "referer": null,
  "userId": null,
  "bot": false,
}
```

**Responses**:

- HTTP 201 Created

```json

HTTP 201 Created
{
    "success": true
}
```

- HTTP 400 Bad Request

```json
{
  "success": false,
  "message": "'pathname' value was not provided"
}
```

- HTTP 500 Internal Server Error

```json
{
  "success": false,
  "message": "Error occured during recording analytics data"
}
```

### POST `/api/analytics`

Receives `JSON` with web vitals metrics data.

**Parameters**:

| Key            | Type     | Required |
| -------------- | -------- | -------- |
| metricId       | `string` | yes      |
| metricName     | `string` | yes      |
| navigationType | `string` | yes      |
| rating         | `string` | yes      |
| value          | `number` | yes      |
| city           | `string` | no       |
| country        | `string` | no       |
| ip             | `string` | no       |
| userAgent      | `string` | no       |
| userId         | `string` | no       |

**Example**:

```json
POST /api/web-vitals
{
  "metricId": "v3-1715693525216-6726584911785",
  "metricName": "LCP",
  "navigationType": "navigate",
  "rating": "good",
  "value": "999.2999999998137",
  "city": null,
  "country": "US",
  "ip": "::1",
  "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
  "userId": null,
}
```

**Responses**:

- HTTP 201 Created

```json

HTTP 201 Created
{
    "success": true
}
```

- HTTP 400 Bad Request

```json
{
  "success": false,
  "message": "Value for 'metricId' was not provided"
}
```

- HTTP 500 Internal Server Error

```json
{
  "success": false,
  "message": "Error occured during recording web vitals data"
}
```

## License

This project is licensed under the MIT License. See the
[LICENSE](https://github.com/Linkerin/limba-vie-analytics-api/blob/main/LICENSE)
file for details.
