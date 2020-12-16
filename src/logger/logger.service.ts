import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  addLog(log) {
    console.log(log);
    return 'log';
    //wait for update :)
  }
}
