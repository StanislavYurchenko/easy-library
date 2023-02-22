import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { defaultSchemaOptions } from '@server-nest/configs';
import { TableName } from '../../../libs';
import { IReview } from '../interface/review.interface';

@Schema({
  ...defaultSchemaOptions,
})
export class Review implements Required<IReview> {
  constructor({ id, author, comment, book, likes, dislikes }: IReview) {
    this.id = id;
    this.author = author;
    this.comment = comment;
    this.book = book;
    this.likes = likes || [];
    this.dislikes = dislikes || [];
  }

  @Transform(({ value }) => value.toString())
  readonly id!: string;

  @Prop({ type: Types.ObjectId, ref: TableName.User, required: true, autopopulate: true })
  readonly author!: string;

  @Prop({ type: String, trim: true, required: true })
  readonly comment!: string;

  @Prop({ type: Types.ObjectId, ref: TableName.Book, required: true, autopopulate: true })
  readonly book!: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.User }], autopopulate: true, default: [] })
  readonly likes!: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.User }], autopopulate: true, default: [] })
  readonly dislikes!: string[];
}

export type ReviewDocument = HydratedDocument<Review>;

export const ReviewSchema = SchemaFactory.createForClass(Review);
