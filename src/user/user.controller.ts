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
import {
  ConfirmUserDTO,
  ReturnUserDTO,
  RequestedBaanChangeDTO,
} from './dto/create-user.dto';
import { MockUserDTO } from './dto/mock.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestWithUserID } from '../utility/type';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: RequestWithUserID): Promise<ReturnUserDTO> {
    return await this.userService.getProfile(req.user.uid);
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  async postProfile(
    @Req() req: RequestWithUserID,
    @Body() confirmUserDTO: ConfirmUserDTO,
  ): Promise<string> {
    return await this.userService.postProfile(req.user.uid, confirmUserDTO);
  }

  @Post('requestBaanChange')
  @UseGuards(JwtAuthGuard)
  async requestedBaanChange(
    @Req() req: RequestWithUserID,
    @Body() requestedBaanChangeDTO: RequestedBaanChangeDTO,
  ): Promise<string> {
    return await this.userService.requestedBaanChange(
      req.user.uid,
      requestedBaanChangeDTO,
    );
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

  @Get('getUploadPolicy')
  @UseGuards(JwtAuthGuard)
  getUploadCred(@Req() req: RequestWithUserID) {
    const ouid = req.user.uid;
    const fileName = this.userService.getImgFileName(ouid);
    return this.userService.getUploadCred(fileName);
  }

  @Get('getUploadFileName')
  @UseGuards(JwtAuthGuard)
  getUploadFileName(@Req() req: RequestWithUserID) {
    const ouid = req.user.uid;
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
