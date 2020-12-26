import { Injectable, CanActivate } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/global/global.service';

@Injectable()
export class PhaseGuard implements CanActivate {
  constructor(private globalService: GlobalService) {}

  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    return (await this.globalService.getGlobal()).phaseCount >= 2;
  }
}
