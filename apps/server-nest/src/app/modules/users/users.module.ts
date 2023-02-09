import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import MongooseAutopopulate from 'mongoose-autopopulate';
import { TableName } from '../../libs';
import { BooksModule, ReviewsModule } from '@server-nest/modules';
import { UsersService } from './service';
import { UsersController } from './controller';
import { UserSchema } from './schema';

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
