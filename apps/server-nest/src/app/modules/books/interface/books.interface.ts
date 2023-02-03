import { Document } from 'mongoose';
import { Book } from '@libs/api-interface';

export interface IBooks extends Document<string, unknown, Book>, Omit<Book, 'id'> {}
