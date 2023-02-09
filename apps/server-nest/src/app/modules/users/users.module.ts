import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import MongooseAutopopulate from 'mongoose-autopopulate';
import { TableName } from '../../libs';
import { UsersService } from './service';
import { UsersController } from './controller';
import { UserSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: TableName.User,
        useFactory: () => UserSchema.plugin(MongooseAutopopulate),
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
