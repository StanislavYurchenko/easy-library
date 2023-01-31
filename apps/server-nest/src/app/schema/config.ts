import { SchemaOptions } from "@nestjs/mongoose";

export const defaultSchemaOptions: SchemaOptions = {
  versionKey: false,
  id: true,
  toJSON: {
    virtuals: ['id'],
    transform: function (doc, ret) {
      delete ret._id;
    },
  },
  toObject: {
    virtuals: ['id'],
    transform: function (doc, ret) {
      delete ret._id;
    },
  },
};
