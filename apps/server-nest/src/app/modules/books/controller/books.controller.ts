import { Controller, Get, Post, Body, Param, Delete, Res, Logger, HttpStatus, Put } from '@nestjs/common';
import { Response } from 'express';
import { ApiEndpoints, BookRes, BooksRes, ErrorRes } from '@libs/api-interface';
import { BooksService } from '../service';
import { CreateBookDto, UpdateBookDto } from '../dto';

@Controller(ApiEndpoints.books)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async createBook(@Res() response: Response<BookRes | ErrorRes>, @Body() createBookDto: CreateBookDto) {
    try {
      const newBook = await this.booksService.createBook(createBookDto);

      Logger.log(`🚀 BookController: Book ${newBook.title} has been created successfully`);

      return response.status(HttpStatus.CREATED).json({
        message: 'Book has been created successfully',
        book: newBook,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: Book not created!',
      });
    }
  }

  @Put('/:id')
  async updateBook(
    @Res() response: Response<BookRes | ErrorRes>,
    @Param('id') bookId: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    try {
      const existingBook = await this.booksService.updateBook(bookId, updateBookDto);

      Logger.log(`🚀 BooksController: Book ${existingBook.title} has been updated successfully`);

      return response.status(HttpStatus.OK).json({
        message: 'Book has been successfully updated',
        book: existingBook,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getBooks(@Res() response: Response<BooksRes | ErrorRes>) {
    try {
      const booksData = await this.booksService.getAllBooks();

      Logger.log(`🚀 UserController: ${booksData.length} users has been got`);

      return response.status(HttpStatus.OK).json({
        message: 'All users data found successfully',
        books: booksData,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getBook(@Res() response: Response<BookRes | ErrorRes>, @Param('id') bookId: string) {
    try {
      const existingBook = await this.booksService.getBook(bookId);

      Logger.log(`🚀 BookController: Book ${existingBook.title} has been got`);

      return response.status(HttpStatus.OK).json({
        message: 'Book found successfully',
        book: existingBook,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteBook(@Res() response: Response<BookRes | ErrorRes>, @Param('id') bookId: string) {
    try {
      const deletedBook = await this.booksService.deleteBook(bookId);

      Logger.log(`🚀 BookController: User ${deletedBook.title} has been deleted`);

      return response.status(HttpStatus.OK).json({
        message: 'Book deleted successfully',
        book: deletedBook,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }
}
