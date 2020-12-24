import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { AssignmentLog } from './assignment_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssignmentLog])],
  providers: [AssignmentService],
  controllers: [AssignmentController],
})
export class AssignmentModule {}
