import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { GlobalService } from './global.service';

@Injectable()
export class GlobalMiddleware implements NestMiddleware {
  constructor(readonly globalService: GlobalService) {}

  async use(req: Request, res: Response, next: () => void) {
    const globalConfig = await this.globalService.getGlobal();

    if (globalConfig.isDown) {
      res.statusCode = HttpStatus.FORBIDDEN;
      res.json({
        statusCode: HttpStatus.FORBIDDEN,
        downReasonEn: globalConfig.downReasonEn,
        downReasonTh: globalConfig.downReasonTh,
      });
    } else next();
  }
}
