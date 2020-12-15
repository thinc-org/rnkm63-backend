import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBadRequestResponse,
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
import { JwtAuthGuard } from './jwt-auth.guard';

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
  async getVerify(
    @Query() query: AuthTicketDto,
    @Res({ passthrough: true }) res,
  ) {
    return this.authService.verifyTicket(query.ticket, res);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Get User Token: For Dev about jwt' })
  getLogout(@Req() req) {
    return req.user;
  }
}
