import { SchemaOptions } from '@nestjs/mongoose';

interface Ret {
  _id?: string;
}

export const defaultSchemaOptions: SchemaOptions = {
  versionKey: false,
  id: true,
  toJSON: {
    virtuals: ['id'],
    transform(doc, ret: Ret) {
      delete ret._id;
    },
  },
  toObject: {
    virtuals: ['id'],
    transform(doc, ret: Ret) {
      delete ret._id;
    },
  },
};
