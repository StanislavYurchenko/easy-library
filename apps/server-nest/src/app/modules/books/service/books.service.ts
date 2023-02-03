import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from '@libs/api-interface';
import { CreateBookDto, UpdateBookDto } from '../dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private bookModel: Model<Book>) {}

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = await new this.bookModel(createBookDto);

    return newBook.save();
  }

  async updateBook(bookId: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const existingBook = await this.bookModel.findByIdAndUpdate(bookId, updateBookDto, { new: true });

    if (!existingBook) {
      throw new NotFoundException(`Book #${bookId} not found`);
    }

    return existingBook;
  }

  async getAllBooks(): Promise<Book[]> {
    const bookData = await this.bookModel.find();

    if (!bookData || bookData.length === 0) {
      throw new NotFoundException('Books data not found!');
    }

    return bookData;
  }

  async getBook(bookId: string): Promise<Book> {
    const existingBook = await this.bookModel.findById(bookId).exec();

    if (!existingBook) {
      throw new NotFoundException(`Book #${bookId} not found`);
    }

    return existingBook;
  }

  async deleteBook(bookId: string): Promise<Book> {
    const deletedBook = await this.bookModel.findByIdAndDelete(bookId);

    if (!deletedBook) {
      throw new NotFoundException(`Book #${bookId} not found`);
    }

    return deletedBook;
  }
}
