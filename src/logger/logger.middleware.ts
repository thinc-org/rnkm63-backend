import { Request, Response } from 'express';
import { NestMiddleware, Injectable } from '@nestjs/common';
import { RequestWithUserID } from '../utility/type';
import { LoggerService, Logger } from './logger.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(readonly loggerService: LoggerService) {}
  generateRequestID(req: Request, res: Response) {
    const reqID = uuidv4();
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
