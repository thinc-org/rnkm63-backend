import { Body, Controller, Get, Param, Query, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
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
  @ApiTooManyRequestsResponse({
    description: 'Request rate to SSO server is exceeded',
  })
  @ApiInternalServerErrorResponse({
    description: "Can't connect to SSO or Internal Server Error",
  })
  async getVerify(@Query() query: AuthTicketDto, @Res() res) {
    if (!!query.mockData) {
      return this.authService.mockVerifyTicket(query.mockData, res);
    }
    return this.authService.verifyTicket(query.ticket, res);
  }

  @Get('logout')
  @ApiOkResponse({ description: 'Logout Sucess' })
  getLogout() {
    return this.authService.getLogout();
  }
}
