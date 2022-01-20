import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { WinstonModule } from 'nest-winston';

import { HttpExceptionFilter } from '@common/filters/exception.filter';
import { LoggerInterceptor } from '@common/interceptors/logger.interceptor';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import httpConfig from '@core/config/http.config';
import throttlerConfig from '@core/config/throttler.config';
import { winstonConfig } from '@core/config/winston.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [httpConfig, throttlerConfig],
      cache: true
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('throttle'),
      inject: [ConfigService]
    }),
    WinstonModule.forRoot(winstonConfig)
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    }
  ]
})
export class AppModule {}
