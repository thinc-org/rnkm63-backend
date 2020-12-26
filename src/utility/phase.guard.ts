import { Injectable, CanActivate } from '@nestjs/common';
import { GlobalService } from 'src/global/global.service';

@Injectable()
export class PhaseGuard implements CanActivate {
  constructor(private globalService: GlobalService) {}

  async canActivate(): Promise<boolean> {
    return (await this.globalService.getGlobal()).phaseCount >= 2;
  }
}
