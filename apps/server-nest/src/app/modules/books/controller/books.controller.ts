import { Controller, Get, Post, Body, Param, Delete, Res, Logger, HttpStatus, Put } from '@nestjs/common';
import { Response } from 'express';
import { ApiEndpoints, ApiRes, IBook } from '@libs/api-interface';
import { BooksService } from '../service/books.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

@Controller(ApiEndpoints.books)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async createBook(@Res() response: Response<ApiRes<IBook>>, @Body() createBookDto: CreateBookDto) {
    try {
      const newBook = await this.booksService.createBook(createBookDto);

      Logger.log(`🚀 BookController: Book ${newBook.title} has been created successfully`);

      return response.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Book has been created successfully',
        data: newBook,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: Book not created!',
        ...err.response,
      });
    }
  }

  @Put('/:id')
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getBooks(@Res() response: Response<ApiRes<IBook[]>>) {
    try {
      const booksData = await this.booksService.getAllBooks();

      Logger.log(`🚀 BookController: ${booksData.length} books has been got`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'All books data found successfully',
        data: booksData,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getBook(@Res() response: Response<ApiRes<IBook>>, @Param('id') bookId: string) {
    try {
      const existingBook = await this.booksService.getBook(bookId);

      Logger.log(`🚀 BookController: Book ${existingBook.title} has been got`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Book found successfully',
        data: existingBook,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteBook(@Res() response: Response<ApiRes<IBook>>, @Param('id') bookId: string) {
    try {
      const deletedBook = await this.booksService.deleteBook(bookId);

      Logger.log(`🚀 BookController: Book ${deletedBook.title} has been deleted`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Book deleted successfully',
        data: deletedBook,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }
}
