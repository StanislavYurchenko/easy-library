import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { defaultSchemaOptions } from '@server-nest/configs';
import { TableName } from '../../../libs';
import { IBook } from '../interface/book.interface';

@Schema({
  ...defaultSchemaOptions,
})
export class Book implements Required<IBook> {
  @Transform(({ value }) => value.toString())
  readonly id!: string;

  @Prop({ type: String, trim: true, required: true })
  readonly title!: string;

  @Prop({ type: String, trim: true, required: true })
  readonly author!: string;

  @Prop({ type: String, trim: true, required: true })
  readonly description!: string;

  @Prop({ type: Number, default: 100 })
  readonly rating!: number;

  @Prop({ type: Boolean, default: true })
  readonly available!: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.User }], autopopulate: true, default: [] })
  readonly inuse!: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.User }], autopopulate: true, default: [] })
  readonly read!: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.User }], autopopulate: true, default: [] })
  readonly wish!: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.User }], autopopulate: true, default: [] })
  readonly likes!: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: TableName.User }], autopopulate: true, default: [] })
  readonly dislikes!: string[];

  @Prop({ type: Number, default: 1 })
  readonly total_quantity!: number;

  @Prop({ type: Number, default: 0 })
  readonly rented_quantity!: number;
}

export type BookDocument = HydratedDocument<IBook>;

export const BookSchema = SchemaFactory.createForClass(Book);
