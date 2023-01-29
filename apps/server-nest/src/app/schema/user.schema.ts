import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({ versionKey: false })
export class User {
  @Prop({ required: true })
  name!: string;

  @Prop({
    required: true,
    unique: true,
  })
  email!: string;

  @Prop()
  phone?: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
