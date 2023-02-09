import { ObjectId } from "mongoose";
import { IReview, IUser } from ".";

export interface IBook {
  readonly id: ObjectId;
  readonly title: string;
  readonly author: string;
  readonly description: string;
  readonly rating?: number;
  readonly available?: boolean;
  readonly reviews?: IReview[];
  readonly likes?: IUser[];
  readonly dislikes?: IUser[];
  readonly total_quantity?: number;
  readonly rented_quantity?: number;
}
