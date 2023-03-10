import { User } from "./user.interface";

export interface Book {
  readonly id: string;
  readonly title: string;
  readonly author: string;
  readonly description: string;
  readonly rating?: number;
  readonly available?: boolean;
  readonly inuse?: User[];
  readonly read?: User[];
  readonly wish?: User[];
  readonly likes?: User[];
  readonly dislikes?: User[];
  readonly total_quantity?: number;
  readonly rented_quantity?: number;
}
