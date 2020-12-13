import { Body, Controller, Get, Param } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthTicketDto } from './dto/auth-ticket.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('verify')
  @ApiOperation({ summary: 'Ticket Verify' })
  @ApiOkResponse({ description: 'Ticket Verified and get user cookie back' })
  @ApiNoContentResponse({ description: 'Ticket Not Verified' })
  @ApiForbiddenResponse({ description: 'Not 63 Student' })
  getVerify(@Body() body: AuthTicketDto) {
    return this.authService.getVerify(body.ticket);
  }

  @Get('logout')
  @ApiOkResponse({ description: 'Logout Sucess' })
  getLogout() {
    return this.authService.getLogout();
  }
}
