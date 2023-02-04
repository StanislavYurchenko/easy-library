import { Document } from 'mongoose';
import { Book } from '@libs/api-interface';

export interface IBook extends Document<string, unknown, Book>, Omit<Book, 'id'> {}
