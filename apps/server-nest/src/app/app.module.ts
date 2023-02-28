import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { ExtendedExceptionFilter } from './libs/filters/extended-exception.filter';
import { UsersModule, ReviewsModule, BooksModule, AuthModule } from './modules';

@Module({
  imports: [ConfigModule.forRoot(), DbModule, AuthModule, UsersModule, BooksModule, ReviewsModule],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_FILTER,
    //   useClass: ExtendedExceptionFilter,
    // },
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
  ],
})
export class AppModule {}
