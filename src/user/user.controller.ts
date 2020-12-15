import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  getProfile() {
    return this.userService.getProfile();
  }

  @Post('profile')
  postProfile() {
    return this.userService.postProfile();
  }

  @Get('getAllUser')
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Get('generateUser')
  generateUser() {
    return this.userService.generateUser();
  }

  @Get()
  getUploadCred() {
    const ouid = 'userId';
    const baanId = 99;
    const fileName = this.userService.getImgFileName(ouid, baanId);
    return this.userService.getUploadCred(fileName);
  }

  @Get('uploadFileName')
  getUploadFileName() {
    const ouid = 'userId';
    const baanId = 99;
    return this.userService.getImgFileName(ouid, baanId);
  }
}
