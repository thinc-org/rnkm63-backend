import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  ConfirmUserDTO,
  ReturnUserDTO,
  RequestedBaanChangeDTO,
  PreferBaanRequestCountDTO,
} from './dto/user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HeaderGuard } from '../auth/header.guard';
import { PhaseGuard } from '../utility/phase.guard';
import { RequestWithUserID } from '../utility/type';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard, HeaderGuard)
  async getProfile(@Req() req: RequestWithUserID): Promise<ReturnUserDTO> {
    return await this.userService.getProfile(req.user.uid);
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard, HeaderGuard)
  async postProfile(
    @Req() req: RequestWithUserID,
    @Body() confirmUserDTO: ConfirmUserDTO,
  ): Promise<string> {
    return await this.userService.postProfile(req.user.uid, confirmUserDTO);
  }

  @Post('leaveActivity')
  @UseGuards(JwtAuthGuard, HeaderGuard)
  async leaveActivity(@Req() req: RequestWithUserID): Promise<string> {
    return await this.userService.leaveActivity(req.user.uid);
  }

  @Get('getUploadPolicy')
  @UseGuards(JwtAuthGuard, HeaderGuard)
  getUploadCred(@Req() req: RequestWithUserID) {
    const ouid = req.user.uid;
    const fileName = this.userService.getImgFileName(ouid);
    return this.userService.getUploadCred(fileName);
  }

  //Begin For Phase 2
  @Post('requestBaanChange')
  @UseGuards(JwtAuthGuard, HeaderGuard, PhaseGuard)
  async requestedBaanChange(
    @Req() req: RequestWithUserID,
    @Body() requestedBaanChangeDTO: RequestedBaanChangeDTO,
  ): Promise<string> {
    return await this.userService.requestedBaanChange(
      req.user.uid,
      requestedBaanChangeDTO,
    );
  }

  @Get('getAllUserPreferBaan')
  @UseGuards(JwtAuthGuard, HeaderGuard, PhaseGuard)
  async getAllUserPreferBaan(): Promise<PreferBaanRequestCountDTO[]> {
    return await this.userService.getAllUserPreferBaan();
  }
  //End For Phase 2

  //Begin For Test Only Section
  @Get('getAllUser')
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Get('generateUser')
  generateUser() {
    return this.userService.generateUser();
  }
  //End For Test Only Section
}
