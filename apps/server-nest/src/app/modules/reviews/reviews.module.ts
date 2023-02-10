/* eslint-disable import/no-cycle */
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import MongooseAutopopulate from 'mongoose-autopopulate';
import { TableName } from '../../libs';
import { BooksModule } from '../books/books.module';
import { UsersModule } from '../users/users.module';
import { ReviewsController } from './controller/reviews.controller';
import { ReviewSchema } from './schema/review.schema';
import { ReviewsService } from './service/reviews.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => BooksModule),
    MongooseModule.forFeatureAsync([
      {
        name: TableName.Review,
        useFactory: () => ReviewSchema.plugin(MongooseAutopopulate),
      },
    ]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
