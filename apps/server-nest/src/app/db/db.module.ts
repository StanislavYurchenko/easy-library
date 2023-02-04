import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BooksModule, UsersModule } from '../modules';
import { mongoConfig } from './db.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_DB_URL'),
        ...mongoConfig,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    BooksModule,
  ],
})
export class DbModule {}
