import 'dotenv/config';
import 'newrelic';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import morgan from 'morgan';
import { WinstonModule } from 'nest-winston';

import { AppModule } from './app.module';
import { winstonConfig } from './core/config/winston.config';
import { createDocument } from './swagger/swagger';

declare const module: any;

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, { logger });

  app.enableShutdownHooks();
  app.setGlobalPrefix('api');
  setCors(app);

  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb' }));
  app.use(bodyParser.raw({ limit: '50mb' }));
  app.use(morgan('dev'));
  setHelmet(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  SwaggerModule.setup('api/docs', app, createDocument(app), {
    validatorUrl: null
  });

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

function setHelmet(app: INestApplication) {
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`]
      }
    })
  );
  app.use(helmet.crossOriginEmbedderPolicy());
  app.use(helmet.crossOriginOpenerPolicy());
  app.use(helmet.crossOriginResourcePolicy());
  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.expectCt());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.originAgentCluster());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.referrerPolicy());
  app.use(helmet.xssFilter());
}

function setCors(app: INestApplication) {
  if (process.env.NODE_ENV === 'production') {
    app.enableCors({
      origin: process.env.CORS_ORIGINS.split(' ')
    });
  } else {
    app.enableCors();
  }
}
