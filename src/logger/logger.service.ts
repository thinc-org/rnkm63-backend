import { Injectable } from '@nestjs/common';
import { InfluxDB, Point } from '@influxdata/influxdb-client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggerService {
  private client: InfluxDB;

  constructor(private configService: ConfigService) {
    this.client = new InfluxDB({
      url: this.configService.get<string>('influxdb.url'),
      token: this.configService.get<string>('influxdb.token'),
    });
  }
  private createPoints(log: Logger) {
    const points = new Point('event')
      .tag('uid', log.uid)
      .tag('method', log.method)
      .tag('path', log.path)
      .tag('status', log.status.toString())
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
    const writeApi = this.client.getWriteApi(
      this.configService.get<string>('influxdb.org'),
      this.configService.get<string>('influxdb.bucket'),
    );

    const point = this.createPoints(log);
    writeApi.writePoint(point);

    writeApi.close();
  }

  addError(error: Error) {
    const writeApi = this.client.getWriteApi(
      this.configService.get<string>('influxdb.org'),
      this.configService.get<string>('influxdb.bucket'),
    );

    const point = this.createErrorPoints(error);
    writeApi.writePoint(point);

    writeApi.close();
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
