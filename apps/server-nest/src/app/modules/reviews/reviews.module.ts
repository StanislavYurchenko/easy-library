import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import MongooseAutopopulate from 'mongoose-autopopulate';
import { TableName } from '../../libs';
import { ReviewsController } from './controller/reviews.controller';
import { ReviewSchema } from './schema/review.schema';
import { ReviewsService } from './service/reviews.service';

@Module({
  imports: [
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
