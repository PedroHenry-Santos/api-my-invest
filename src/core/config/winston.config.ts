import 'newrelic';
import newrelicFormatter from '@newrelic/winston-enricher';
import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

import { loggerStyle } from '@common/constants/logger-styles';

export const winstonConfig: WinstonModuleOptions = {
  levels: winston.config.npm.levels,
  level: 'verbose',
  format: newrelicFormatter(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'DD-MM-YYYY HH:mm:ss'
        }),
        winston.format.colorize({
          colors: { info: 'blue', error: 'red', warn: 'yellow' }
        }),
        winston.format.label({ label: 'Desapego' }),
        winston.format.printf(loggerStyle)
      )
    }),
    new winston.transports.File({
      level: 'verbose',
      filename: 'application.log',
      dirname: 'logs'
    })
  ]
};
