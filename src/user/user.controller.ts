import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  ConfirmUserDTO,
  ReturnUserDTO,
  RequestedBaanChangeDTO,
} from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HeaderGuard } from '../auth/header.guard';
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

  @Get('getUploadPolicy')
  @UseGuards(JwtAuthGuard, HeaderGuard)
  getUploadCred(@Req() req: RequestWithUserID) {
    const ouid = req.user.uid;
    const fileName = this.userService.getImgFileName(ouid);
    return this.userService.getUploadCred(fileName);
  }

  //Begin For Phase 2
  @Post('requestBaanChange')
  @UseGuards(JwtAuthGuard, HeaderGuard)
  async requestedBaanChange(
    @Req() req: RequestWithUserID,
    @Body() requestedBaanChangeDTO: RequestedBaanChangeDTO,
  ): Promise<string> {
    return await this.userService.requestedBaanChange(
      req.user.uid,
      requestedBaanChangeDTO,
    );
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
