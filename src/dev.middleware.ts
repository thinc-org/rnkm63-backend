import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DevMiddleware implements NestMiddleware {
  private isInDev = false;
  constructor(private configService: ConfigService) {
    this.isInDev = this.configService.get<boolean>('inDev');
  }

  use(req: any, res: any, next: () => void) {
    if (!this.isInDev) {
      res.statusCode = HttpStatus.FORBIDDEN;
      res.json({
        statusCode: HttpStatus.FORBIDDEN,
      });
    } else next();
  }
}
