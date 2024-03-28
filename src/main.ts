import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api') // เช่น http://localhost:3000/api/user
  await app.listen(3000);
}
bootstrap();
