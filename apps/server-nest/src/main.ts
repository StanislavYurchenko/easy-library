import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { globalPrefix } from '@libs/api-interface';
import { AppModule } from './app/app.module';
import { allowCorsList, swaggerConfig } from './main.config';

async function bootstrap() {
  const port = process.env.PORT || 3333;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(globalPrefix);
  app.enableCors({ origin: allowCorsList });

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const swaggerUrl = 'dock';

  SwaggerModule.setup(swaggerUrl, app, document);
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
  Logger.log(`🚀 Documentation is running on: http://localhost:${port}/${swaggerUrl}`);
}

bootstrap();
