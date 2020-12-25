import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssignmentService } from './assignment.service';
import { AssignmentHistoryDTO } from './dto/assignment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HeaderGuard } from '../auth/header.guard';
import { PhaseGuard } from '../utility/phase.guard';
import { RequestWithUserID } from '../utility/type';

@ApiTags('assignment')
@Controller('assignment')
export class AssignmentController {
  constructor(private assignmentService: AssignmentService) {}

  @Get('getHistory')
  @UseGuards(JwtAuthGuard, HeaderGuard, PhaseGuard)
  async getHistory(
    @Req() req: RequestWithUserID,
  ): Promise<AssignmentHistoryDTO[]> {
    return await this.assignmentService.getHistory(req.user.uid);
  }

  //Begin Test Section
  @Get('generateAssignmentLogDatabase')
  @UseGuards(JwtAuthGuard, HeaderGuard)
  async generateAssignmentLogDatabase(@Req() req: RequestWithUserID) {
    return await this.assignmentService.generateAssignmentLogDatabase(
      req.user.uid,
    );
  }
  //End Test Section
}
