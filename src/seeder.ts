import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(SeederModule);
  const seeder = app.get(SeederService);
  app.useGlobalPipes (new ValidationPipe({
    whitelist: true, 
  }));
  await seeder.seed();
  await app.close();

}
bootstrap();

