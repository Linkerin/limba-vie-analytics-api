export type AnalyticsBody = {
  pathname: string;
  os?: string;
  osVersion?: string;
  engine?: string;
  engineVersion?: string;
  deviceType?: string;
  deviceModel?: string;
  deviceVendor?: string;
  browser?: string;
  browserVersion?: string;
  country?: string;
  city?: string;
  ip?: string;
  referer?: string;
  userId?: string;
  bot?: boolean;
};

// export type QueryParamsRecord<T extends Record<string, unknown>> = {
//   [P in keyof T as P extends string ? `$${P}` : never]: T[P];
// };

export type WebVitalsBody = {
  metricId: string;
  metricName: string;
  navigationType: string;
  rating: string;
  value: number;
  city?: string;
  country?: string;
  ip?: string;
  userAgent?: string;
  userId?: string;
};
