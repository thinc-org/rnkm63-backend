import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssignmentLog } from './assignment_log.entity';
import { AssignmentHistoryDTO } from './dto/assignment.dto';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(AssignmentLog)
    private assignmentLogRepository: Repository<AssignmentLog>,
  ) {}

  async getHistory(uid: string): Promise<AssignmentHistoryDTO[]> {
    return await this.assignmentLogRepository
      .createQueryBuilder()
      .select('AssignmentLog.fromBaan', 'fromBaan')
      .addSelect('AssignmentLog.preferBaan', 'preferBaan')
      .addSelect('AssignmentLog.assignedBaan', 'assignedBaan')
      .addSelect('AssignmentLog.round', 'round')
      .where('AssignmentLog.uid = :uid', { uid: uid })
      .orderBy('AssignmentLog.round')
      .getRawMany();
  }

  //Begin Test Section
  async generateAssignmentLogDatabase(uid: string) {
    if ((await this.assignmentLogRepository.count({ uid: uid })) === 0)
      for (let i = 0; i <= 9; i++) {
        const assignmentLog = new AssignmentLog();
        assignmentLog.uid = uid;
        assignmentLog.fromBaan = Math.floor(Math.random() * 30);
        assignmentLog.preferBaan = Math.floor(Math.random() * 30);
        assignmentLog.assignedBaan =
          Math.random() > 0.5
            ? assignmentLog.fromBaan
            : assignmentLog.preferBaan;
        assignmentLog.round = i;
        await this.assignmentLogRepository.save(assignmentLog);
      }
    return await this.assignmentLogRepository.find({ uid: uid });
  }
  //End Test Section
}
