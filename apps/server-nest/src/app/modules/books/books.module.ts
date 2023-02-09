import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import MongooseAutopopulate from 'mongoose-autopopulate';
import { TableName } from '../../libs';
import { BooksService } from './service/books.service';
import { BooksController } from './controller/books.controller';
import { BookSchema } from './schema';

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
})
export class BooksModule {}
