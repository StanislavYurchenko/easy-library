export interface IReview {
  readonly id: string;
  readonly author: string;
  readonly comment: string;
  readonly book: string;
  readonly likes?: string[];
  readonly dislikes?: string[];
}

export enum ReviewAction {
  add = 'add',
  remove = 'remove',
}

export enum ReviewProperty {
  likes = 'likes',
  dislikes = 'dislikes',
}

export interface UpdateReviewUserIdList {
  readonly action: ReviewAction;
  readonly property: ReviewProperty;
  readonly userId: string;
}
