import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GlobalService } from '../global/global.service';

@Injectable()
export class CronService {
  constructor(private globalService: GlobalService) {}

  @Cron(new Date("2021-01-09T12:00:00+07:00"))
  setGlobalPhaseCron() {
    this.globalService.setGlobalPhase(2);
  }
}
