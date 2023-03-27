import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import cors from 'cors';
import { globalPrefix } from '@libs/api-interface';
import { AppModule } from './app/app.module';
import { swaggerConfig } from './main.config';

const allowlist = ['http://localhost:4200'];

const corsOptionsDelegate = (req: any, callback: any) => {
  let corsOptions;

  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }

  callback(null, corsOptions); // callback expects two parameters: error and options
};

async function bootstrap() {
  const port = process.env.PORT || 3333;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(globalPrefix);
  app.use(cors(corsOptionsDelegate));

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const swaggerUrl = 'dock';

  SwaggerModule.setup(swaggerUrl, app, document);
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
  Logger.log(`🚀 Documentation is running on: http://localhost:${port}/${swaggerUrl}`);
}

bootstrap();
