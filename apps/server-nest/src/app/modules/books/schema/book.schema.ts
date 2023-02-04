import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Book } from '@libs/api-interface';
import { defaultSchemaOptions } from '@server-nest/configs';

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
