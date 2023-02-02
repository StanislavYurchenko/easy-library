import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {defaultSchemaOptions} from "../../../configs";
import {Book} from "@libs/api-interface";

@Schema({
  ...defaultSchemaOptions,
})
class BookEntity implements Book {
  id!: string;

  @Prop({
    required: true,
  })
  title!: string;

  @Prop({
    required: true,
  })
  author!: string;

  @Prop()
  description!: string;
}

export const BookSchema = SchemaFactory.createForClass(BookEntity);
