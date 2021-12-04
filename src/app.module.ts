import { HttpModuleOptions, Module } from '@nestjs/common';
import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from '@ntegral/nestjs-s3';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { ConnectionOptions } from 'typeorm';

import HTTPconfig from './core/config/http.config';
import redisConfig from './core/config/redis.config';
import s3Config from './core/config/s3.config';
import sentryConfig from './core/config/sentry.config';
import throttlerConfig from './core/config/throttler.config';
import ORMConfig from './core/config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        registerAs('typeorm', (): ConnectionOptions => ORMConfig),
        registerAs('axios', (): HttpModuleOptions => HTTPconfig),
        redisConfig,
        throttlerConfig,
        sentryConfig,
        s3Config
      ],
      cache: true
    }),
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('sentry'),
      inject: [ConfigService]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
      inject: [ConfigService]
    }),
    S3Module.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('s3'),
      inject: [ConfigService]
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('throttle'),
      inject: [ConfigService]
    }),
    TerminusModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
