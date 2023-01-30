import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controller/user/user.controller';
import { UserService } from './service/user/user.service';
import { mongoConfig, mongoModels, mongoUrl } from './app.config'; 

@Module({
  imports: [
    MongooseModule.forRoot(mongoUrl, mongoConfig),
    MongooseModule.forFeature(mongoModels),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}

