import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { v4 as uuid } from 'uuid';
import { Logger } from 'winston';

import errorStatus from '../constants/http-status';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private httpAdapter: AbstractHttpAdapter;

  constructor(
    adapterHost: HttpAdapterHost,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
  ) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  async catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let message: any = exception.message;
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    const code = uuid();

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      message =
        typeof exception.getResponse() === 'object'
          ? await Object.entries(exception.getResponse())
              .map(({ '0': key, '1': value }) => {
                if (key === 'message') {
                  if (typeof value !== 'string') {
                    return value.map((messageOne: string) => {
                      return {
                        [JSON.parse(messageOne).field]:
                          JSON.parse(messageOne).message
                      };
                    });
                  }

                  try {
                    return JSON.parse(value).message;
                  } catch (error) {
                    return Promise.resolve(value);
                  }
                }
              })[1]
              .reduce((obj, item) => {
                return { ...obj, ...item };
              }, {})
          : exception.getResponse();
    }

    this.emitErrorLog(request, message, status, exception.stack, code);

    this.httpAdapter.reply(
      response,
      {
        statusCode: status,
        success: status < 400,
        error: {
          code,
          message: message ?? errorStatus[String(status)],
          timestamp: new Date().toISOString(),
          path: request.url
        },
        data: null,
        metadata: {
          user: ctx.getRequest().user ?? undefined,
          pagination: undefined
        }
      },
      status
    );
  }

  private emitErrorLog(
    req: any,
    message: any,
    status: number,
    stack: string,
    code: string
  ) {
    const body = { ...req.body };

    delete body.password;
    delete body.passwordConfirmation;

    this.logger.error({
      code,
      timestamp: new Date().toISOString(),
      method: req.method,
      status,
      route: req.route.path,
      data: {
        body: body,
        query: req.query,
        params: req.params
      },
      error: { message, stack: stack.split('\n    ') },
      from: req.ip,
      madeBy: (req as any).user ? (req as any).user.email : null
    });
  }
}
