import { HttpModuleOptions } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'axios',
  (): HttpModuleOptions => ({
    timeout: parseInt(process.env.AXIOS_TIMEOUT),
    maxRedirects: parseInt(process.env.AXIOS_MAX_REDIRECTS)
  })
);
