import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaanService } from './baan.service';

@ApiTags('baan')
@Controller('baan')
export class BaanController {
  constructor(private baanService: BaanService) {}

  @Get('generateBaanDatabase')
  async generateBaanDatabase() {
    return await this.baanService.generateBaanDatabase();
  }
}
