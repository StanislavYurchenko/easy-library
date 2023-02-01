import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@libs/api-interface';
import { defaultSchemaOptions } from './config';

@Schema({
  ...defaultSchemaOptions,
})
class UserEntity implements User {
  id!: string;
  
  @Prop({ required: true })
  name!: string;

  @Prop({
    required: true,
    unique: true,
  })
  email!: string;

  @Prop()
  phone?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
