import { Module } from '@nestjs/common';
import { UserService } from './service';
import { UserController } from './controller';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema:  UserSchema }])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
