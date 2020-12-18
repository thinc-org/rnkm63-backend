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
    const points = new Point('request')
      .intField('timeRequest', log.timeRequest)
      .stringField('ipAddress', log.ipAddress)
      .stringField('uid', log.uid)
      .stringField('method', log.method)
      .stringField('path', log.path)
      .stringField('reqBody', log.reqBody)
      .intField('status', log.status)
      .intField('duration', log.duration)
      .stringField('reqID', log.reqID);
    return points;
  }

  addLog(log: Logger) {
    const point = this.createPoints(log);
    this.writeApi.writePoint(point);
    console.log(point);
  }
}
export interface Logger {
  timeRequest: number;
  ipAddress: string;
  uid: string;
  method: string;
  path: string;
  reqBody: string;
  status: string;
  duration: number;
  reqID: string;
}
