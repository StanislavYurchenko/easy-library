/* eslint-disable import/no-cycle */
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import MongooseAutopopulate from 'mongoose-autopopulate';
import { TableName } from '../../libs';
import { BooksModule } from '../books/books.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { UserSchema } from './schema/user.schema';

@Module({
  imports: [
    forwardRef(() => ReviewsModule),
    forwardRef(() => BooksModule),
    MongooseModule.forFeatureAsync([
      {
        name: TableName.User,
        useFactory: () => UserSchema.plugin(MongooseAutopopulate),
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
