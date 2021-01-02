import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GlobalService } from '../global/global.service';

@Injectable()
export class CronService {
  constructor(private globalService: GlobalService) {}

  @Cron(new Date('2021-01-09T12:00:00+07:00'))
  setGlobalPhaseTo2() {
    this.globalService.setGlobalPhase(2);
  }

  @Cron(new Date('2021-01-13T12:15:00+07:00'))
  setGlobalPhaseTo3() {
    this.globalService.setGlobalPhase(3);
  }
}
