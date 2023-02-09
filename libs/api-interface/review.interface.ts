import { ObjectId } from "mongoose";
import { IBook, IUser } from ".";

export interface IReview {
  readonly id: ObjectId;
  readonly author: IUser;
  readonly comment: string;
  readonly book: IBook;
  readonly likes?: IUser[];
  readonly dislikes?: IUser[];
}
