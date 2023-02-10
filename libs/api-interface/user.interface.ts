import { ObjectId } from "mongoose";
import { IBook, IReview } from ".";

export interface IUser {
  readonly id: ObjectId;
  readonly name: string;
  readonly email: string;
  readonly password?: string;
  readonly phone?: string;
  readonly inuse_books?: IBook[];
  readonly read_books?: IBook[];
  readonly wish_books?: IBook[];
  readonly reviews?: IReview[];
}
