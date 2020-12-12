import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot(
    {
      isGlobal: true,
      load: [configuration],
    }
  ), 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
