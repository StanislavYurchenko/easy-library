import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UsersModule, ReviewsModule, BooksModule, AuthModule } from './modules';

@Module({
  imports: [ConfigModule.forRoot(), DbModule, AuthModule, UsersModule, BooksModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
