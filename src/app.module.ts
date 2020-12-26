import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BaanModule } from './baan/baan.module';
import { GlobalModule } from './global/global.module';
import { GlobalMiddleware } from './global/global.middleware';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { LoggerFilter } from './logger/logger.filter';
import { DevMiddleware } from './dev.middleware';
import { APP_FILTER } from '@nestjs/core';
import { AssignmentModule } from './assignment/assignment.module';
import { CronService } from './cron/cron.service';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        synchronize: false,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    BaanModule,
    GlobalModule,
    LoggerModule,
    AssignmentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: LoggerFilter,
    },
    CronService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GlobalMiddleware)
      // .exclude('global')
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer.apply(DevMiddleware).forRoutes(
      { path: 'user/getAllUser', method: RequestMethod.ALL },
      { path: 'user/generateUser', method: RequestMethod.ALL },
      { path: 'baan/generateBaanDatabase', method: RequestMethod.ALL },
      {
        path: 'assignment/generateAssignmentLogDatabase',
        method: RequestMethod.ALL,
      },
    );
  }
}
