import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Global } from './global.entity';

@Injectable()
export class GlobalService {
  private cacheGlobalConfig: Global = null;
  private cacheTimeStamp = 0;

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

  async getGlobal(): Promise<Global> {
    if (new Date().getTime() - this.cacheTimeStamp >= 10000) {
      this.cacheTimeStamp = new Date().getTime();
      const globalConfig = await this.globalRepository.findOne(1);
      if (typeof globalConfig === 'undefined')
        this.cacheGlobalConfig = await this.createGlobal();
      else this.cacheGlobalConfig = globalConfig;
    }
    return this.cacheGlobalConfig;
  }

  async getGlobalRound(): Promise<number> {
    return (await this.getGlobal()).roundCount;
  }

  async getGlobalPhase(): Promise<number> {
    return (await this.getGlobal()).phaseCount;
  }

  async setGlobalPhase(phaseNumber: number): Promise<Global> {
    const global = await this.globalRepository.findOne(1);

    global.phaseCount = phaseNumber;
    return await this.globalRepository.save(global);
  }
}
