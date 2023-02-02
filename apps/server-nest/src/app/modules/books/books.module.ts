import { Module } from '@nestjs/common';
import { BooksService } from './service/books.service';
import { BooksController } from './controller/books.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {BookSchema} from "./schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema:  BookSchema }])
  ],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
