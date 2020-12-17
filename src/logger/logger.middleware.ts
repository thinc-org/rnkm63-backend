import { Request, Response, NextFunction } from 'express';
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
    //readonly authService: AuthService,      //<------------- something wrong
    readonly loggerService: LoggerService, //<-------------- something wrong
  ) {}
  generateRequestID() {
    const str = generateRandomString(7);
    const num = generateRandomNumber(7);
    return str + num;
  }
  requestVariable(req) {
    return {
      timeRequest: Date.now(),
      ipAddress: req.ip,
      //IDK why it can't get uid ----> always undefined
      uid: req.user?.uid,
      method: req.method,
      path: req.originalUrl,
      reqBody: JSON.stringify(req.body),
    };
  }
  responseVariable(res) {
    return {
      end: Date.now(),
      status: res.statusCode,
    };
  }
  use(req: RequestWithUserID, res: Response, next: NextFunction) {
    const reqVar = this.requestVariable(req);
    const resVar = this.responseVariable(res);
    const result = {
      ...reqVar,
      //status always 200 wait to fix
      status: resVar.status,
      //I don't sure 'duration' is working right?
      duration: resVar.end - reqVar.timeRequest,
      reqID: this.generateRequestID(),
    } as Logger;
    console.log(result);
    this.loggerService.addLog({
      measurement: 'response',
      fields: result,
      tags: {},
    });
    next();
  }
}
export type RequestWithId = Request & { reqID: string };
