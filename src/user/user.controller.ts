import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ConfirmUserDTO, UserData } from './dto/create-user.dto';
import { MockUserDTO } from './dto/mock.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  getProfile(): string {
    return this.userService.getProfile();
  }

  @Post('profile')
  postProfile(@Body() confirmUserDTO: ConfirmUserDTO): string {
    return this.userService.postProfile(confirmUserDTO);
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
    const fileName = this.userService.getImgFileName(ouid);
    return this.userService.getUploadCred(fileName);
  }

  @Get('uploadFileName')
  getUploadFileName() {
    const ouid = 'userId';
    return this.userService.getImgFileName(ouid);
  }

  @Get('mockUser')
  @ApiOperation({ summary: 'Get Mock User Date delete after real finish' })
  getMockData(@Query() query: MockUserDTO) {
    return this.userService.mockUser(query.mode);
  }
}
