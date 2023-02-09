import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBook } from '@libs/api-interface';
import { CreateBookDto, UpdateBookDto } from '../dto';
import { BookDocument } from '../schema';
import { TableName } from '../../../libs';

@Injectable()
export class BooksService {
  constructor(@InjectModel(TableName.Book) private bookModel: Model<BookDocument>) {}

  async createBook(createBookDto: CreateBookDto): Promise<IBook> {
    let newBook = await new this.bookModel(createBookDto).populate({ path: 'reviews' });

    newBook = await newBook.populate({ path: 'likes' });
    newBook = await newBook.populate({ path: 'dislikes' });

    return newBook.save();
  }

  async updateBook(bookId: string, updateBookDto: UpdateBookDto): Promise<IBook> {
    const existingBook = await this.bookModel
      .findByIdAndUpdate(bookId, updateBookDto, { new: true })
      .populate({ path: 'reviews' })
      .populate({ path: 'likes' })
      .populate({ path: 'dislikes' });

    if (!existingBook) {
      throw new NotFoundException(`Book #${bookId} not found`);
    }

    return existingBook;
  }

  async getAllBooks(): Promise<IBook[]> {
    const bookData = await this.bookModel
      .find()
      .populate({ path: 'reviews' })
      .populate({ path: 'likes' })
      .populate({ path: 'dislikes' });

    if (!bookData || bookData.length === 0) {
      throw new NotFoundException('Books data not found!');
    }

    return bookData;
  }

  async getBook(bookId: string): Promise<IBook> {
    const existingBook = await this.bookModel
      .findById(bookId)
      .populate({ path: 'reviews' })
      .populate({ path: 'likes' })
      .populate({ path: 'dislikes' });

    if (!existingBook) {
      throw new NotFoundException(`Book #${bookId} not found`);
    }

    return existingBook;
  }

  async deleteBook(bookId: string): Promise<IBook> {
    const deletedBook = await this.bookModel
      .findByIdAndDelete(bookId)
      .populate({ path: 'reviews' })
      .populate({ path: 'likes' })
      .populate({ path: 'dislikes' });

    if (!deletedBook) {
      throw new NotFoundException(`Book #${bookId} not found`);
    }

    return deletedBook;
  }
}
