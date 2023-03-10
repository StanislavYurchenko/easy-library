import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TableName } from '../../../libs';
import { BookDocument } from '../schema/book.schema';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BookAction, IBook } from '../interface/book.interface';
import { UpdateBookUserIdListDto } from '../dto/update-book-user-id-list.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(TableName.Book) private readonly bookModel: Model<BookDocument>) {}

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

  async updateBookUserIdList(bookId: string, { action, property, userId }: UpdateBookUserIdListDto): Promise<IBook> {
    let book;

    if (action === BookAction.add) {
      book = await this.bookModel.findByIdAndUpdate(bookId, { $addToSet: { [`${property}`]: userId } }, { new: true });
    }

    if (action === BookAction.remove) {
      book = await this.bookModel.findByIdAndUpdate(bookId, { $pull: { [`${property}`]: userId } }, { new: true });
    }

    if (!book) {
      throw new NotFoundException(`Book #${bookId} not found`);
    }

    return book.toObject();
  }
}
