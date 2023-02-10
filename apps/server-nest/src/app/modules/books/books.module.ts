/* eslint-disable import/no-cycle */
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import MongooseAutopopulate from 'mongoose-autopopulate';
import { TableName } from '../../libs';
import { ReviewsModule } from '../reviews/reviews.module';
import { UsersModule } from '../users/users.module';
import { BooksController } from './controller/books.controller';
import { BookSchema } from './schema/book.schema';
import { BooksService } from './service/books.service';

@Module({
  imports: [
    forwardRef(() => ReviewsModule),
    forwardRef(() => UsersModule),
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
