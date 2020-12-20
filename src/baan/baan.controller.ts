import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaanService } from './baan.service';

@ApiTags('baan')
@Controller('baan')
export class BaanController {}
