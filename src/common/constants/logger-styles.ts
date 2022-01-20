import winston from 'winston';

export const loggerStyle = (info: winston.Logform.TransformableInfo) =>
  `\x1B[105;1m[${info.label}]\x1B[49;0m \x1B[1m${info.level}\x1B[0m [${
    info.timestamp
  }] \x1B[106;1;30m${
    info.context ? info.context : info['entity.type']
  }\x1B[49;0m: ${
    info.level === '\x1B[31merror\x1B[39m' ? `\x1B[31m` : `\x1B[36m`
  }${
    typeof info.message === 'object'
      ? JSON.stringify(info.message, null, 2)
      : info.message
  }${`\x1B[39m`} - ${JSON.stringify({
    'entity.name': info['entity.name'],
    'entity.type': info['entity.type'],
    hostname: info.hostname
  })}`;
