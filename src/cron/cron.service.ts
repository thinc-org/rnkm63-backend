import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GlobalService } from '../global/global.service';

@Injectable()
export class CronService {
  constructor(private globalService: GlobalService) {}

  @Cron('0 0 12 9 1 *')
  handleCron() {
    this.globalService.setGlobalPhase(2);
  }
}
