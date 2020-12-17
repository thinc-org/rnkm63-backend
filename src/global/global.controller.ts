import { Controller, Get } from '@nestjs/common';
import { GlobalService } from './global.service';
import { GlobalConfigDTO } from './dto/global-config.dto';

@Controller('global')
export class GlobalController {
  constructor(private globalService: GlobalService) {}

  @Get('config')
  async getConfig(): Promise<GlobalConfigDTO> {
    return await this.globalService.getGlobal();
  }
}
