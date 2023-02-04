import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongoConfig: MongooseModuleOptions = {
  dbName: 'easylibrarydb',
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
