import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import MongooseAutopopulate from 'mongoose-autopopulate';
import { TableName } from '../../libs';
import { BooksController } from './controller/books.controller';
import { BookSchema } from './schema/book.schema';
import { BooksService } from './service/books.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: TableName.Book,
        useFactory: () => BookSchema.plugin(MongooseAutopopulate),
      },
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
