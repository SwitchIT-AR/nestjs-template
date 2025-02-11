import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ZodFilter } from './zod.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.disable('x-powered-by');
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new ZodFilter());
  await app.listen(8080);
}

void bootstrap();
