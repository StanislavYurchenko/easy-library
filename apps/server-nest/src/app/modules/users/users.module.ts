import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TableName } from '../../libs';
import { UsersService } from './service';
import { UsersController } from './controller';
import { UserSchema } from './schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: TableName.User, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
