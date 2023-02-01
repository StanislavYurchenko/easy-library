import { ModelDefinition, MongooseModuleOptions } from "@nestjs/mongoose";
import { UserSchema } from '@server-nest/schema';

export const mongoConfig: MongooseModuleOptions = {
  dbName: 'easylibrarydb',
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const mongoUrl = process.env.MONGO_DB_URL as string;

export const mongoModels: ModelDefinition[] = [
  { name: 'User', schema:  UserSchema },
];
