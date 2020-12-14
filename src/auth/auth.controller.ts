import { Body, Controller, Get, Param, Query, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthTicketDto } from './dto/auth-ticket.dto';
import { TokenDto } from './dto/token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get('verify')
  @ApiOperation({ summary: 'Ticket Verify' })
  @ApiOkResponse({ description: 'Ticket Verified and get user cookie back' })
  @ApiUnprocessableEntityResponse({ description: 'Ticket Not Verified' })
  @ApiForbiddenResponse({ description: 'Not 63/Freshmen Student' })
  @ApiBadRequestResponse({ description: 'No Ticket Found' })
  @ApiTooManyRequestsResponse({
    description: 'Request rate to SSO server is exceeded',
  })
  @ApiInternalServerErrorResponse({
    description: "Can't connect to SSO or Internal Server Error",
  })
  @ApiCreatedResponse({
    description: 'Ticket has been checked',
    type: TokenDto,
  })
  async getVerify(
    @Query() query: AuthTicketDto,
    @Res({ passthrough: true }) res,
  ) {
    return this.authService.verifyTicket(query.ticket, res);
  }

  @Get('logout')
  @ApiOkResponse({ description: 'Logout Sucess' })
  getLogout() {
    return this.authService.getLogout();
  }
}
