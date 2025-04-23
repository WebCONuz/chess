import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const Port = process.env.PORT ?? 3301;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(Port, () =>
    console.log(`Dastur ${Port}-portda ishga tushdi`),
  );
}
bootstrap();
