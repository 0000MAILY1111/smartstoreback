import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes (new ValidationPipe({
    whitelist: true, 
  }));
  app.useStaticAssets(join(__dirname, '../public'))
  await app.listen(3000);
  ///ultimo config >nextfrontend part1
}
bootstrap();

