import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from '@server-nest/controller';
import { UserService } from '@server-nest/service';
import { mongoConfig, mongoModels, mongoUrl } from './app.config'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot(mongoUrl, mongoConfig),
    MongooseModule.forFeature(mongoModels),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}

