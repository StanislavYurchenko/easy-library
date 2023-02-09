import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBook } from '@libs/api-interface';
import { CreateBookDto, UpdateBookDto } from '../dto';
import { BookDocument } from '../schema';
import { TableName } from '../../../libs';
import { ReviewsService, UsersService } from '@server-nest/modules';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(TableName.Book) private bookModel: Model<BookDocument>,
    @Inject(forwardRef(() => UsersService)) private readonly UsersService: UsersService,
    @Inject(forwardRef(() => ReviewsService)) private readonly reviewsService: ReviewsService,
  ) {}

  async createBook(createBookDto: CreateBookDto): Promise<IBook> {
    const newBook = await new this.bookModel(createBookDto);

    return newBook.save();
  }

  async updateBook(bookId: string, updateBookDto: UpdateBookDto): Promise<IBook> {
    const existingBook = await this.bookModel.findByIdAndUpdate(bookId, updateBookDto, { new: true });

    if (!existingBook) {
      throw new NotFoundException(`Book #${bookId} not found`);
    }

    return existingBook;
  }

  async getAllBooks(): Promise<IBook[]> {
    const bookData = await this.bookModel.find();

    if (!bookData || bookData.length === 0) {
      throw new NotFoundException('Books data not found!');
    }

    return bookData;
  }

  async getBook(bookId: string): Promise<IBook> {
    const existingBook = await this.bookModel.findById(bookId);

    if (!existingBook) {
      throw new NotFoundException(`Book #${bookId} not found`);
    }

    return existingBook;
  }

  async deleteBook(bookId: string): Promise<IBook> {
    const deletedBook = await this.bookModel.findByIdAndDelete(bookId);

    if (!deletedBook) {
      throw new NotFoundException(`Book #${bookId} not found`);
    }

    return deletedBook;
  }
}
