import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ConfirmUserDTO, UserData } from './dto/create-user.dto';
import { MockUserDTO } from './dto/mock.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return this.userService.getProfile(req.user.uid);
  }

  @Post('profile')
  postProfile(@Body() confirmUserDTO: ConfirmUserDTO): string {
    return this.userService.postProfile(confirmUserDTO);
  }

  //Begin For Test Only Section
  // @Get('user')
  // @UseGuards(JwtAuthGuard)
  // getUser(@Req() req) {
  //   return req.user;
  // }

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

  @Get(':id')
  findUser(@Param() params) {
    return this.userService.findUser(params.id);
  }
  //End For Test Only Section
}
