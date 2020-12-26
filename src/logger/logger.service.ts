import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { InfluxDB, Point, WriteApi } from '@influxdata/influxdb-client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggerService implements OnModuleDestroy {
  private client: InfluxDB;
  private writeApi: WriteApi;

  constructor(private configService: ConfigService) {
    this.client = new InfluxDB({
      url: this.configService.get<string>('influxdb.url'),
      token: this.configService.get<string>('influxdb.token'),
    });
    this.writeApi = this.client.getWriteApi(
      this.configService.get<string>('influxdb.org'),
      this.configService.get<string>('influxdb.bucket'),
    );
  }
  onModuleDestroy() {
    this.writeApi.close();
  }
  private createPoints(log: Logger) {
    const points = new Point('event')
      .tag('uid', log.uid)
      .tag('method', log.method)
      .tag('path', log.path)
      .stringField('reqBody', log.reqBody)
      .intField('status', log.status)
      .intField('duration', log.duration)
      .stringField('reqID', log.reqID);
    return points;
  }
  private createErrorPoints(error: Error) {
    const points = new Point('error')
      .stringField('reqID', error.reqID)
      .intField('code', error.code)
      .stringField('message', error.message)
      .stringField('error', error.message);
    return points;
  }

  addLog(log: Logger) {
    const point = this.createPoints(log);
    this.writeApi.writePoint(point);
  }
  addError(error: Error) {
    const point = this.createErrorPoints(error);
    this.writeApi.writePoint(point);
  }
}
export interface Error {
  reqID: string;
  code: number;
  message: string;
  error: string;
}

export interface Logger {
  uid: string;
  method: string;
  path: string;
  reqBody: string;
  status: string;
  duration: number;
  reqID: string;
}
