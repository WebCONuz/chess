import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // port
  const Port = process.env.PORT ?? 3301;

  // main app
  const app = await NestFactory.create(AppModule);

  // global validation
  app.useGlobalPipes(new ValidationPipe());

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Chess competition')
    .setDescription('Chess tournaments')
    .setVersion('1.0')
    .addTag('chess')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  // listen app
  await app.listen(Port, () =>
    console.log(`Dastur ${Port}-portda ishga tushdi`),
  );
}
bootstrap();
