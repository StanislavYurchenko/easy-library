export interface IReview {
  readonly id: string;
  readonly author: string;
  readonly comment: string;
  readonly book: string;
  readonly likes?: string[];
  readonly dislikes?: string[];
}
