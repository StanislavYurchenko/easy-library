import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule, UsersModule } from './modules';
import { DbModule } from './db/db.module';

@Module({
  imports: [ConfigModule.forRoot(), DbModule, UsersModule, BooksModule],
  controllers: [AppController],
  providers: [AppService, UsersModule, BooksModule],
})
export class AppModule {}
