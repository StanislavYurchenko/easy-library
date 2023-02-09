import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TableName } from '../../libs';
import { ReviewsService } from './service/reviews.service';
import { ReviewsController } from './controller/reviews.controller';
import { ReviewSchema } from './schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: TableName.Review, schema: ReviewSchema }])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
