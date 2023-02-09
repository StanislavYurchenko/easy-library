import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule, UsersModule, ReviewsModule } from './modules';
import { DbModule } from './db/db.module';

@Module({
  imports: [ConfigModule.forRoot(), DbModule, UsersModule, BooksModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
