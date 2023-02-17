export const globalPrefix = 'api';

export enum ApiEndpoints {
  users = 'users',
  books = 'books',
  reviews = 'reviews',
  auth = 'auth',
}

export enum AuthEndpoints {
  login = 'login',
  logout = 'logout',
  signin = 'signin',
  signout = 'signout',
}

export enum UserEndpoints {
  profile = 'profile',
}

export enum BookEndpoints {
  updateBookUserIdList = 'updateBookUserIdList',
}

export enum ReviewEndpoints {
  updateReviewUserIdList = 'updateReviewUserIdList',
}

