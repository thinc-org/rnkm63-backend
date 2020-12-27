import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GlobalService } from '../global/global.service';

@Injectable()
export class CronService {
  constructor(private globalService: GlobalService) {}

  @Cron(new Date(2021, 0, 9, 12))
  setGlobalPhaseCron() {
    this.globalService.setGlobalPhase(2);
  }
}
