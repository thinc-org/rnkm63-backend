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

  async onModuleDestroy() {
    try {
      await this.writeApi.close();
    } catch (e) {
      console.error('Closing Logger failed', e);
    }
  }

  private createPoints(log: Logger) {
    const points = new Point('event')
      .tag('uid', log.uid)
      .tag('method', log.method)
      .tag('path', log.path)
      .tag('status', log.status.toString())
      .tag('duration', log.duration.toString())
      .stringField('reqBody', log.reqBody);
    return points;
  }
  private createErrorPoints(error: Error) {
    const points = new Point('error')
      .tag('reqID', error.reqID)
      .stringField('error', error.error);
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
  status: number;
  duration: number;
  reqID: string;
}
