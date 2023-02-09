import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import MongooseAutopopulate from 'mongoose-autopopulate';
import { TableName } from '../../libs';

import { UsersModule, BooksModule } from '@server-nest/modules';
import { ReviewsService } from './service';
import { ReviewsController } from './controller';
import { ReviewSchema } from './schema';

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
