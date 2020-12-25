import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { AssignmentLog } from './assignment_log.entity';
import { GlobalModule } from '../global/global.module';

@Module({
  imports: [TypeOrmModule.forFeature([AssignmentLog]), GlobalModule],
  providers: [AssignmentService],
  controllers: [AssignmentController],
})
export class AssignmentModule {}
