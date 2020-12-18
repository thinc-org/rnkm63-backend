import { Request, Response } from 'express';
import { NestMiddleware, Injectable } from '@nestjs/common';
import {
  generateRandomString,
  generateRandomNumber,
} from '../utility/function';
import { RequestWithUserID } from '../utility/type';
import { AuthService } from '../auth/auth.service';
import { LoggerService, Logger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    readonly authService: AuthService,
    readonly loggerService: LoggerService,
  ) {}
  generateRequestID(req: Request, res: Response) {
    const str = generateRandomString(7);
    const num = generateRandomNumber(7);
    const reqID = str + num;
    res.append('X-Request-ID', reqID);
    (req as RequestWithID).reqid = reqID;
  }
  extractVariable(req, res) {
    return {
      ipAddress: req.ip,
      uid: (req as RequestWithUserID).user?.uid,
      method: req.method,
      path: req.originalUrl,
      reqBody: JSON.stringify(req.body),
      status: res.statusCode,
    };
  }
  use(req: Request, res: Response, next: () => void) {
    this.generateRequestID(req, res);
    const start = Date.now();
    res.on('finish', () => {
      const result = {
        timeRequest: start,
        ...this.extractVariable(req, res),
        duration: Date.now() - start,
        reqID: (req as RequestWithID).reqid,
      } as Logger;
      this.loggerService.addLog(result);
    });
    next();
  }
}
export type RequestWithID = Request & { reqid: string };
