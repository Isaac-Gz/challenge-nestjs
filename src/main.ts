import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { LoggerService } from './services/logger/logger.service';

async function bootstrap() {
  const logger = new Logger();
  const port = 3000;
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Challenge API')
    .setDescription('Challenge description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth')
    .addTag('Users')
    .addTag('Accounts')
    .addTag('Teams')
    .addTag('Records')
    .addTag('User-type')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  logger.log(`Aplication listening on port ${port}`);
}
bootstrap();
