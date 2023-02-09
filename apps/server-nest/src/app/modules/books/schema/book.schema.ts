import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { IBook, IReview, IUser } from '@libs/api-interface';
import { defaultSchemaOptions } from '@server-nest/configs';
import { TableName } from '../../../libs';

@Schema({
  ...defaultSchemaOptions,
})
class Book implements Required<IBook> {
  id!: ObjectId;

  @Prop({ type: String, trim: true, required: true })
  title!: string;

  @Prop({ type: String, trim: true, required: true })
  author!: string;

  @Prop({ type: String, trim: true, required: true })
  description!: string;

  @Prop({ type: Number })
  rating!: number;

  @Prop({ type: Boolean })
  available!: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.Review }] })
  reviews!: IReview[];

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.User }] })
  likes!: IUser[];

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.User }] })
  dislikes!: IUser[];

  @Prop({ type: Number })
  total_quantity!: number;

  @Prop({ type: Number })
  rented_quantity!: number;
}

export type BookDocument = HydratedDocument<IBook>;

export const BookSchema = SchemaFactory.createForClass(Book);
