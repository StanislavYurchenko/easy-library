import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig, mongoUrl } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "./modules/user/user.module";
import {BooksModule} from "./modules/books/books.module";

@Module({
  imports: [
    MongooseModule.forRoot(mongoUrl, mongoConfig),
    UserModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

