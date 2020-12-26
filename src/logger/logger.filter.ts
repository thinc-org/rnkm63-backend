import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Error, LoggerService } from './logger.service';
import { serializeError } from 'serialize-error';
import { RequestWithID } from './logger.middleware';

@Catch()
export class LoggerFilter implements ExceptionFilter {
  constructor(readonly loggerService: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const err = {
      reqID: (request as RequestWithID).reqid,
      code: 500,
      message: '',
      error: serializeError(exception).stack,
    } as Error;

    if (exception instanceof HttpException) {
      err.code = exception.getStatus();
      if (typeof exception.getResponse() === 'string') {
        err.message = exception.getResponse() as string;
      } else {
        const ex = exception.getResponse() as Record<string, string>;
        if ('message' in ex) {
          err.message = ex['message'];
        }
      }
    }
    if (err.code === 500) {
      console.error(exception);
    }

    this.loggerService.addError(err);

    response.status(err.code).json({
      statusCode: err.code,
      message: err.message,
    });
  }
}
