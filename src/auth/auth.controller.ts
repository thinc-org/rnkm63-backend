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
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthTicketDto } from './dto/auth-ticket.dto';
import { TokenDto } from './dto/token.dto';
import { HeaderGuard } from './header.guard';
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
  @UseGuards(HeaderGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get User Uid',
    description:
      'Check if fetch with cookie and custom headers works : For Dev about headers and Jwt Guard',
  })
  getUser(@Req() req) {
    return req.user;
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Clear cookie',
    description:
      'Check if fetch with cookie works : For Dev+frontend test about Jwt Guard',
  })
  @ApiUnauthorizedResponse({ description: 'No Cookie Token' })
  getLogout(@Req() req, @Res({ passthrough: true }) res) {
    res.clearCookie('token');
    return { message: 'Cleared Cookie/Logout' };
  }
}
