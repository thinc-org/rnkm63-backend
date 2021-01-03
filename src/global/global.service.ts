import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cachePromise } from 'src/utility/function';
import { Repository } from 'typeorm';
import { Global } from './global.entity';

@Injectable()
export class GlobalService {
  constructor(
    @InjectRepository(Global)
    private globalRepository: Repository<Global>,
  ) {}

  async createGlobal(): Promise<Global> {
    const global = new Global();

    global.isDown = false;
    global.downReasonEn = null;
    global.downReasonTh = null;
    global.roundCount = 1;
    global.phaseCount = 1;
    return await this.globalRepository.save(global);
  }

  getGlobal = cachePromise(
    async (): Promise<Global> => {
      const globalConfig = await this.globalRepository.findOne(1);
      if (typeof globalConfig === 'undefined') {
        return await this.createGlobal();
      } else {
        return globalConfig;
      }
    },
  );

  async setGlobalPhase(phaseNumber: number): Promise<Global> {
    const global = await this.globalRepository.findOne(1);

    global.phaseCount = phaseNumber;
    return await this.globalRepository.save(global);
  }
}
