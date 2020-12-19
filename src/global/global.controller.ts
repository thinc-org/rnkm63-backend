import { Controller, Get } from '@nestjs/common';
import { GlobalService } from './global.service';

@Controller('global')
export class GlobalController {
  constructor(private globalService: GlobalService) {}

  @Get('round')
  async getRound(): Promise<number> {
    return await this.globalService.getGlobalRound();
  }
}
