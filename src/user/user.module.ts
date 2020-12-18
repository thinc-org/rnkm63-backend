import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { GlobalModule } from '../global/global.module';
import { BaanModule } from '../baan/baan.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), GlobalModule, BaanModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
