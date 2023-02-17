export interface IBook {
  readonly id: string;
  readonly title: string;
  readonly author: string;
  readonly description: string;
  readonly rating?: number;
  readonly available?: boolean;
  readonly inuse?: string[];
  readonly read?: string[];
  readonly wish?: string[];
  readonly likes?: string[];
  readonly dislikes?: string[];
  readonly total_quantity?: number;
  readonly rented_quantity?: number;
}

export enum BookAction {
  add = 'add',
  remove = 'remove',
}

export enum BookProperty {
  inuse = 'inuse',
  read = 'read',
  wish = 'wish',
  likes = 'likes',
  dislikes = 'dislikes',
}

export interface UpdateBookUserIdList {
  readonly action: BookAction;
  readonly property: BookProperty;
  readonly userId: string;
}
