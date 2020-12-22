import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaanService } from './baan.service';
import { Baan } from './baan.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HeaderGuard } from '../auth/header.guard';

@ApiTags('baan')
@Controller('baan')
export class BaanController {
  constructor(private baanService: BaanService) {}

  @Get('generateBaanDatabase')
  async generateBaanDatabase() {
    return await this.baanService.generateBaanDatabase();
  }
}
