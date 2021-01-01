import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalService } from './global.service';
import { Global } from './global.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Global])],
  providers: [GlobalService],
  exports: [GlobalService],
})
export class GlobalModule {}
