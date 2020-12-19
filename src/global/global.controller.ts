import { Controller, Get } from '@nestjs/common';
import { GlobalService } from './global.service';
// import { Global } from './global.entity';

@Controller('global')
export class GlobalController {
  constructor(private globalService: GlobalService) {}

  // @Get('config')
  // async getConfig(): Promise<Global> {
  //   return await this.globalService.getGlobal();
  // }

  @Get('round')
  async getRound(): Promise<number> {
    return await this.globalService.getGlobalRound();
  }
}
