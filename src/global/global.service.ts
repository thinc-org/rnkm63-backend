import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Global } from './global.entity';
import { GlobalConfigDTO } from './dto/global-config.dto';
import pMemoize = require('p-memoize');

let globalConfig: GlobalConfigDTO = null;
let globalConfigTimeStamp: number = null;

@Injectable()
export class GlobalService {
  constructor(
    @InjectRepository(Global)
    private globalRepository: Repository<Global>,
  ) {}

  async getGlobal(): Promise<GlobalConfigDTO> {
    if (
      globalConfig === null ||
      new Date().getTime() - globalConfigTimeStamp >= 10000
    ) {
      console.log('Load Config From DB ' + new Date());
      globalConfigTimeStamp = new Date().getTime();
      let loadConfig = await this.globalRepository.findOne(1);
      if (typeof loadConfig === 'undefined') {
        await this.createGlobal();
        loadConfig = await this.globalRepository.findOne(1);
      }
      globalConfig = {
        isDown: loadConfig.isDown,
        downReasonEn: loadConfig.downReasonEn,
        downReasonTh: loadConfig.downReasonTh,
        roundCount: loadConfig.roundCount,
        phaseCount: loadConfig.phaseCount,
      };
    }
    return globalConfig;
  }

  // async getGlobal(): Promise<GlobalConfigDTO> {
  //   let globalConfig: Global;
  //   const memFunction = async () => {
  //     console.log('Load Config From DB ' + new Date());
  //     globalConfig = await this.globalRepository.findOne(1);
  //     if (typeof globalConfig === 'undefined') {
  //       await this.createGlobal();
  //       globalConfig = await this.globalRepository.findOne(1);
  //     }
  //   };
  //   pMemoize(memFunction, { maxAge: 10000 });
  //   await memFunction();
  //   return {
  //     isDown: globalConfig.isDown,
  //     downReasonEn: globalConfig.downReasonEn,
  //     downReasonTh: globalConfig.downReasonTh,
  //     roundCount: globalConfig.roundCount,
  //     phaseCount: globalConfig.phaseCount,
  //   };
  // }

  async createGlobal() {
    console.log('Create Global Config');
    const global = new Global();

    global.isDown = false;
    global.downReasonEn = null;
    global.downReasonTh = null;
    global.roundCount = 0;
    global.phaseCount = 0;
    await this.globalRepository.save(global);
  }
}
