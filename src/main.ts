import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import * as SwaggerStats from 'swagger-stats';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);

  //Swagger
  const options = new DocumentBuilder()
    .setTitle('RNKM 63 API')
    .setDescription('Doc for API')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('user')
    .addTag('misc')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  //Swagger-stats
  app.use(SwaggerStats.getMiddleware({ swaggerSpec: document }));

  app.use(cookieParser());

  app.enableCors();

  await app.listen(configService.get('port'));
}
bootstrap();
