import { HttpModuleOptions } from '@nestjs/common';

const HTTPconfig: HttpModuleOptions = {
  timeout: parseInt(process.env.AXIOS_TIMEOUT),
  maxRedirects: parseInt(process.env.AXIOS_MAX_REDIRECTS)
};

export default HTTPconfig;
