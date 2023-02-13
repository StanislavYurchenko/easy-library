import { Book } from "./book.interface";
import { User } from "./user.interface";

export interface Review {
  readonly id: string;
  readonly author: User;
  readonly comment: string;
  readonly book: Book;
  readonly likes?: User[];
  readonly dislikes?: User[];
}
