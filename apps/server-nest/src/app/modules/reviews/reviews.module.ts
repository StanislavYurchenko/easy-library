import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import MongooseAutopopulate from 'mongoose-autopopulate';
import { TableName } from '../../libs';
import { ReviewsService } from './service/reviews.service';
import { ReviewsController } from './controller/reviews.controller';
import { ReviewSchema } from './schema';

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
})
export class ReviewsModule {}
