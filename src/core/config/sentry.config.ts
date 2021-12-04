import { registerAs } from '@nestjs/config';
import { LogLevel } from '@sentry/types';

export default registerAs('sentry', () => ({
  dsn: process.env.SENTRY_DNS,
  debug: process.env.NODE_ENV === 'development',
  environment: process.env.NODE_ENV,
  release: null, // must create a release in sentry.io dashboard
  logLevel: LogLevel.Debug //based on sentry.io loglevel //
}));
