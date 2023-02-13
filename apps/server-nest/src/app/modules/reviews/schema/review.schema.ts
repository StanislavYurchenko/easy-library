import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { defaultSchemaOptions } from '@server-nest/configs';
import { TableName } from '../../../libs';
import { IReview } from '../interface/review.interface';

@Schema({
  ...defaultSchemaOptions,
})
class Review implements Required<IReview> {
  @Transform(({ value }) => value.toString())
  id!: string;

  @Prop({ type: Types.ObjectId, ref: TableName.User, required: true, autopopulate: true })
  author!: string;

  @Prop({ type: String, trim: true, required: true })
  comment!: string;

  @Prop({ type: Types.ObjectId, ref: TableName.Book, required: true, autopopulate: true })
  book!: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.User }], autopopulate: true })
  likes!: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.User }], autopopulate: true })
  dislikes!: string[];
}

export type ReviewDocument = HydratedDocument<Review>;

export const ReviewSchema = SchemaFactory.createForClass(Review);
