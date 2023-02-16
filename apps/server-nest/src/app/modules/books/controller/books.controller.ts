import { Controller, Get, Post, Body, Param, Delete, Res, Logger, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiEndpoints, ApiRes } from '@libs/api-interface';
import { BooksService } from '../service/books.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { IBook } from '../interface/book.interface';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags(ApiEndpoints.books)
@Controller(ApiEndpoints.books)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiBody({ type: CreateBookDto })
  @ApiCreatedResponse({ description: 'Book has been created successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async createBook(@Res() response: Response<ApiRes<IBook>>, @Body() createBookDto: CreateBookDto) {
    try {
      const newBook = await this.booksService.createBook(createBookDto);

      Logger.log(`🚀 BookController: Book ${newBook.title} has been created successfully`);

      return response.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Book has been created successfully',
        data: newBook,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id')
  @ApiBody({ type: UpdateBookDto })
  @ApiOkResponse({ description: 'Book has been successfully updated' })
  @ApiNotFoundResponse({ description: 'Book #<id> not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async updateBook(
    @Res() response: Response<ApiRes<IBook>>,
    @Param('id') bookId: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    try {
      const existingBook = await this.booksService.updateBook(bookId, updateBookDto);

      Logger.log(`🚀 BooksController: Book ${existingBook.title} has been updated successfully`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Book has been successfully updated',
        data: existingBook,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  @ApiOkResponse({ description: 'All books found successfully' })
  @ApiNotFoundResponse({ description: 'Books data not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getBooks(@Res() response: Response<ApiRes<IBook[]>>) {
    try {
      const booksData = await this.booksService.getAllBooks();

      Logger.log(`🚀 BookController: ${booksData.length} books has been got`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'All books data found successfully',
        data: booksData,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'User found successfully' })
  @ApiNotFoundResponse({ description: 'Book #<id> not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getBook(@Res() response: Response<ApiRes<IBook>>, @Param('id') bookId: string) {
    try {
      const existingBook = await this.booksService.getBook(bookId);

      Logger.log(`🚀 BookController: Book ${existingBook.title} has been got`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Book found successfully',
        data: existingBook,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  @ApiOkResponse({ description: 'Book deleted successfully' })
  @ApiNotFoundResponse({ description: 'Book #<id> not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async deleteBook(@Res() response: Response<ApiRes<IBook>>, @Param('id') bookId: string) {
    try {
      const deletedBook = await this.booksService.deleteBook(bookId);

      Logger.log(`🚀 BookController: Book ${deletedBook.title} has been deleted`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Book deleted successfully',
        data: deletedBook,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }
}
