import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import MongooseAutopopulate from 'mongoose-autopopulate';
import { TableName } from '../../libs';
import { UsersModule, ReviewsModule } from '@server-nest/modules';
import { BooksService } from './service';
import { BooksController } from './controller';
import { BookSchema } from './schema';

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
