import { Injectable, CanActivate } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/global/global.service';

@Injectable()
export class PhaseGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private globalService: GlobalService,
  ) {}

  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    const check = async () => {
      const phase = (await this.globalService.getGlobal()).phaseCount;
      return phase >= 2;
    };
    return check();
  }
}
