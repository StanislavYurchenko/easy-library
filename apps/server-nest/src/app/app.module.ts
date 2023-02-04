import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule, UsersModule } from './modules';
import { DbModule } from './db/db.module';

@Module({
  imports: [DbModule, UsersModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
