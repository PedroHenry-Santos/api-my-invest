import {
  Injectable,
  Inject,
  NestInterceptor,
  CallHandler,
  ExecutionContext
} from '@nestjs/common';

import { Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Logger } from 'winston';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.log(context.switchToHttp().getRequest());
    return next.handle();
  }

  private log(req: Request) {
    const code = uuid();
    const body = { ...req.body };
    delete body.password;
    delete body.confirmPassword;
    delete body.oldPassword;
    const user = (req as any).user;
    const userEmail = user ? user.email : null;

    this.logger.info({
      code,
      timestamp: new Date().toISOString(),
      method: req.method,
      route: req.route.path,
      data: {
        body: body,
        query: req.query,
        params: req.params
      },
      from: req.ip,
      madeBy: userEmail
    });
  }
}
