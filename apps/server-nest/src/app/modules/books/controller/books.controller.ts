import { Controller, Get, Post, Body, Param, Delete, Res, Logger, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiEndpoints, ApiRes, BookEndpoints } from '@libs/api-interface';
import { BooksService } from '../service/books.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { IBook } from '../interface/book.interface';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { UpdateBookUserIdListDto } from '../dto/update-book-user-id-list.dto';
import {
  AbilitiesGuard,
  CheckAbilities,
  createBookAbility,
  deleteBookAbility,
  readBookAbility,
  updateBookAbility,
} from '../../ability';

@ApiBearerAuth()
@ApiTags(ApiEndpoints.books)
@UseGuards(JwtAuthGuard)
@Controller(ApiEndpoints.books)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiBody({ type: UpdateBookUserIdListDto })
  @ApiOkResponse({ description: 'Book has been successfully updated' })
  @ApiNotFoundResponse({ description: 'Book #<id> not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(readBookAbility)
  @Put(`/${BookEndpoints.updateBookUserIdList}/:id`)
  async updateBookUserIdList(
    @Res() response: Response<ApiRes<IBook>>,
    @Param('id') bookId: string,
    @Body() updateBookDto: UpdateBookUserIdListDto,
  ) {
    const existingBook = await this.booksService.updateBookUserIdList(bookId, updateBookDto);

    Logger.log(`🚀 BooksController: Book ${existingBook.title} has been updated successfully`);

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Book has been successfully updated',
      data: existingBook,
    });
  }

  @ApiBody({ type: CreateBookDto })
  @ApiCreatedResponse({ description: 'Book has been created successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(createBookAbility)
  @Post()
  async createBook(@Res() response: Response<ApiRes<IBook>>, @Body() createBookDto: CreateBookDto) {
    const newBook = await this.booksService.createBook(createBookDto);

    Logger.log(`🚀 BookController: Book ${newBook.title} has been created successfully`);

    return response.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'Book has been created successfully',
      data: newBook,
    });
  }

  @ApiBody({ type: UpdateBookDto })
  @ApiOkResponse({ description: 'Book has been successfully updated' })
  @ApiNotFoundResponse({ description: 'Book #<id> not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(updateBookAbility)
  @Put('/:id')
  async updateBook(
    @Res() response: Response<ApiRes<IBook>>,
    @Param('id') bookId: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    const existingBook = await this.booksService.updateBook(bookId, updateBookDto);

    Logger.log(`🚀 BooksController: Book ${existingBook.title} has been updated successfully`);

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Book has been successfully updated',
      data: existingBook,
    });
  }

  @ApiOkResponse({ description: 'All books found successfully' })
  @ApiNotFoundResponse({ description: 'Books data not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(readBookAbility)
  @Get()
  async getBooks(@Res() response: Response<ApiRes<IBook[]>>) {
    const booksData = await this.booksService.getAllBooks();

    Logger.log(`🚀 BookController: ${booksData.length} books has been got`);

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'All books data found successfully',
      data: booksData,
    });
  }

  @ApiOkResponse({ description: 'User found successfully' })
  @ApiNotFoundResponse({ description: 'Book #<id> not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(readBookAbility)
  @Get('/:id')
  async getBook(@Res() response: Response<ApiRes<IBook>>, @Param('id') bookId: string) {
    const existingBook = await this.booksService.getBook(bookId);

    Logger.log(`🚀 BookController: Book ${existingBook.title} has been got`);

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Book found successfully',
      data: existingBook,
    });
  }

  @ApiOkResponse({ description: 'Book deleted successfully' })
  @ApiNotFoundResponse({ description: 'Book #<id> not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(deleteBookAbility)
  @Delete('/:id')
  async deleteBook(@Res() response: Response<ApiRes<IBook>>, @Param('id') bookId: string) {
    const deletedBook = await this.booksService.deleteBook(bookId);

    Logger.log(`🚀 BookController: Book ${deletedBook.title} has been deleted`);

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Book deleted successfully',
      data: deletedBook,
    });
  }
}
