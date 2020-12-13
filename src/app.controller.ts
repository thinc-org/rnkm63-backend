import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiTags('misc')
  @ApiOperation({ summary: 'Check Connection' })
  @ApiResponse({ status: 200, description: 'Can Connect' })
  getHello(): string {
    return this.appService.getHello();
  }
}
