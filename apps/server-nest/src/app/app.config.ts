import { MongooseModuleOptions } from "@nestjs/mongoose";
import { UserSchema } from "./schema/user.schema";

export const mongoConfig: MongooseModuleOptions = {
  dbName: 'easylibrarydb',
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const mongoUrl = process.env.MONGO_DB_URL as string;

export const mongoModels = [
  { name: 'User', schema: UserSchema }
];
