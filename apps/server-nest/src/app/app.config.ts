import { MongooseModuleOptions } from "@nestjs/mongoose";

export const mongoConfig: MongooseModuleOptions = {
  dbName: 'easylibrarydb',
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const mongoUrl = process.env.MONGO_DB_URL as string;
