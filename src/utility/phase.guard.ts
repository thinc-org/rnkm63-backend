import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/global/global.service';

@Injectable()
export class PhaseGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private globalService: GlobalService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //Begin For Swagger In Dev Mode
    if (this.configService.get<boolean>('inDev')) {
      return true;
    }
    //End For Swagger In Dev Mode
    const check = async () => {
      const phase = (await this.globalService.getGlobal()).phaseCount;
      return phase >= 2;
    };
    return check();
  }
}
