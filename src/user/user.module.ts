import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { GlobalModule } from '../global/global.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), GlobalModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
