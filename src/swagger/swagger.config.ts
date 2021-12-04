import { SwaggerConfig } from './swagger.interface';

/**
 * Configuration for the swagger UI (found at /api).
 * Change this to suit your app!
 */
export const SWAGGER_CONFIG: SwaggerConfig = {
  title: 'Desapego Amigo Api',
  description: 'Api do aplicativo desapego amigo',
  version: '1.0.0',
  tags: [],
  contact: {
    name: 'Strawti',
    url: 'strawti.com',
    email: 'pedro@strawti.com'
  },
  bearer: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT'
  }
};
