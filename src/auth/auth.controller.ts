import { Body, Controller, Get, Param, Query, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
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
  @ApiNotFoundResponse({ description: 'Ticket Not Verified' })
  @ApiForbiddenResponse({ description: 'Not 63/Freshmen Student' })
  @ApiBadRequestResponse({ description: 'No Ticket Found' })
  async getVerify(@Query() query: AuthTicketDto, @Res() res) {
    return this.authService.getVerify(query.ticket, res);
  }

  @Get('logout')
  @ApiOkResponse({ description: 'Logout Sucess' })
  getLogout() {
    return this.authService.getLogout();
  }
}
