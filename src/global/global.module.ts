import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalService } from './global.service';
import { Global } from './global.entity';
import { GlobalController } from './global.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Global])],
  providers: [GlobalService],
  controllers: [GlobalController],
})
export class GlobalModule {}
