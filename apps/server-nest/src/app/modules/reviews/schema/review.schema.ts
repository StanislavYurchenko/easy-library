import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { IBook, IReview, IUser } from '@libs/api-interface';
import { defaultSchemaOptions } from '@server-nest/configs';
import { TableName } from '../../../libs';

@Schema({
  ...defaultSchemaOptions,
})
class Review implements Required<IReview> {
  id!: ObjectId;

  @Prop({ type: Types.ObjectId, ref: TableName.User, required: true })
  author!: IUser;

  @Prop({ type: String, trim: true, required: true })
  comment!: string;

  @Prop({ type: Types.ObjectId, ref: TableName.Book, required: true })
  book!: IBook;

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.User }] })
  likes!: IUser[];

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.User }] })
  dislikes!: IUser[];
}

export type ReviewDocument = HydratedDocument<Review>;

export const ReviewSchema = SchemaFactory.createForClass(Review);
