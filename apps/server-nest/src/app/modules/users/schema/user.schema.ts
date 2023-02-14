import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import { defaultSchemaOptions } from '@server-nest/configs';
import { validateEmail } from '../../../libs';
import { IUser } from '../interface/user.interface';

@Schema({
  ...defaultSchemaOptions,
})
class User implements Required<IUser> {
  @Transform(({ value }) => value.toString())
  id!: string;

  @Prop({ type: String, trim: true, required: true })
  name!: string;

  @Prop({
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address'],
  })
  email!: string;

  @Prop({ type: String, trim: true, required: true })
  password!: string;

  @Prop({ type: String, trim: true })
  phone!: string;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
