import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import * as SwaggerStats from 'swagger-stats';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
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
  if (configService.get('inDev')) {
    SwaggerModule.setup('api', app, document);
  }

  //Swagger-stats
  app.use(SwaggerStats.getMiddleware({ swaggerSpec: document }));

  app.use(cookieParser());

  app.enableShutdownHooks();

  if (configService.get('cors.use')) {
    app.enableCors({
      origin: configService.get('cors.origin'),
      credentials: true,
    });
  }

  app.set('trust proxy', 1);

  await app.listen(configService.get('port'));
}
bootstrap();
