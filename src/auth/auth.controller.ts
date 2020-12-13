import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('verify')
  getVerify() {
    return this.authService.getVerify();
  }

  @Get('logout')
  getLogout() {
    return this.authService.getLogout();
  }
}
