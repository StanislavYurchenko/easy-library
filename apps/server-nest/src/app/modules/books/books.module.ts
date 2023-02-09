import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TableName } from '../../libs';
import { BooksService } from './service/books.service';
import { BooksController } from './controller/books.controller';
import { BookSchema } from './schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: TableName.Book, schema: BookSchema }])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
