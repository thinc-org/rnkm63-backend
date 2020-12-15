import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaanService } from './baan.service';
import { BaanController } from './baan.controller';
import { Baan } from './baan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Baan])],
  providers: [BaanService],
  controllers: [BaanController],
})
export class BaanModule {}
