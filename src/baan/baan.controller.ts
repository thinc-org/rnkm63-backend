import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaanService } from './baan.service';

@ApiTags('baan')
@Controller('baan')
export class BaanController {
  constructor(private baanService: BaanService) {}

  @Get(':id')
  getBaan(@Param() params) {
    return this.baanService.findBaan(params.id);
  }
}
