import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { IBook, IReview, IUser } from '@libs/api-interface';
import { defaultSchemaOptions } from '@server-nest/configs';
import { TableName, validateEmail } from '../../../libs';

@Schema({
  ...defaultSchemaOptions,
})
export class User implements Required<IUser> {
  id!: ObjectId;

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

  @Prop({ type: String, trim: true })
  password!: string;

  @Prop({ type: String, trim: true })
  phone!: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.Book }], autopopulate: false })
  inuse_books!: IBook[];

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.Book }], autopopulate: false })
  read_books!: IBook[];

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.Book }], autopopulate: false })
  wish_books!: IBook[];

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.Review }], autopopulate: false })
  reviews!: IReview[];
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
