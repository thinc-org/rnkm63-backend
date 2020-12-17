import { Injectable } from '@nestjs/common';
import * as Influx from 'influx';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggerService {
  private client: Influx.InfluxDB;
  constructor(private configService: ConfigService) {
    this.client = this.connectDB();
  }
  private connectDB(): Influx.InfluxDB {
    const config: Influx.ISingleHostConfig = {
      host: this.configService.get<string>('database.host'),
      database: this.configService.get<string>('database.name'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('influxdb.password'),
      schema: [
        {
          measurement: 'response',
          fields: {
            timeRequest: Influx.FieldType.INTEGER,
            ipAddress: Influx.FieldType.STRING,
            uid: Influx.FieldType.STRING,
            method: Influx.FieldType.STRING,
            path: Influx.FieldType.STRING,
            reqBody: Influx.FieldType.STRING,
            status: Influx.FieldType.STRING,
            duration: Influx.FieldType.INTEGER,
            reqID: Influx.FieldType.STRING,
          },
          tags: [],
        },
      ],
    };
    return new Influx.InfluxDB(config);
  }

  addLog(log: Influx.IPoint) {
    this.client.writePoints([log]).catch(err => {
      console.log('ERROR: ' + JSON.stringify(err));
    });
  }
}
export class Logger {
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
