import { Request, Response, NextFunction } from 'express';
import { NestMiddleware, Injectable } from '@nestjs/common';
import {
  generateRandomString,
  generateRandomNumber,
} from '../../utility/function';
import { RequestWithUserID } from '../../utility/type';
import { AuthService } from '../../auth/auth.service';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  /*constructor(
        readonly authService: AuthService,      //<------------- something wrong
        readonly loggerService: LoggerService, //<-------------- something wrong
    ) {}*/
  generateRequestID() {
    const str = generateRandomString(7);
    const num = generateRandomNumber(7);
    return str + num;
  }
  requestVarible(req: RequestWithUserID) {
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
  use(req: RequestWithUserID, res: Response, next: NextFunction) {
    const reqVar = this.requestVarible(req);
    const result = {
      ...reqVar,
      //status always 200 wait to fix
      status: res.statusCode,
      //I don't sure 'duration' is working right?
      duration: Date.now() - reqVar.timeRequest,
      reqID: this.generateRequestID(),
    };
    console.log(result);
    //this.loggerService.addLog(result)
    next();
  }
}
