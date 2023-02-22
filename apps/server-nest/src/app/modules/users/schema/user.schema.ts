import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Transform } from 'class-transformer';
import { defaultSchemaOptions } from '@server-nest/configs';
import { validateEmail } from '../../../libs';
import { IUser } from '../interface/user.interface';

@Schema({
  ...defaultSchemaOptions,
})
export class User implements Required<IUser> {
  constructor(user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password || '';
    this.phone = user.phone || '';
    this.isAdmin = user.isAdmin || false;
  }

  @Transform(({ value }) => value.toString())
  readonly id!: string;

  @Prop({ type: String, trim: true, required: true })
  readonly name!: string;

  @Prop({
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address'],
  })
  readonly email!: string;

  @Prop({ type: String, trim: true, required: true, select: false })
  readonly password!: string;

  @Prop({ type: String, trim: true, default: '' })
  readonly phone!: string;

  @Prop({ type: Boolean, default: false })
  readonly isAdmin!: boolean;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
