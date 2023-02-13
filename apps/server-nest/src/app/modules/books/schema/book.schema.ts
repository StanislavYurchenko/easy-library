import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { defaultSchemaOptions } from '@server-nest/configs';
import { TableName } from '../../../libs';
import { IBook } from '../interface/book.interface';

@Schema({
  ...defaultSchemaOptions,
})
class Book implements Required<IBook> {
  @Transform(({ value }) => value.toString())
  id!: string;

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

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.User }], autopopulate: true })
  inuse!: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.User }], autopopulate: true })
  read!: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.User }], autopopulate: true })
  wish!: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.User }], autopopulate: true })
  likes!: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.User }], autopopulate: true })
  dislikes!: string[];

  @Prop({ type: Number })
  total_quantity!: number;

  @Prop({ type: Number })
  rented_quantity!: number;
}

export type BookDocument = HydratedDocument<IBook>;

export const BookSchema = SchemaFactory.createForClass(Book);
