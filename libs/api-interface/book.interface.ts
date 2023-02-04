export interface Book {
  readonly id: string;
  readonly title: string;
  readonly author: string;
  readonly description?: string;
}


export interface BookRes {
  readonly message: string;
  readonly book: Book;
}

export interface BooksRes {
  readonly message: string;
  readonly books: Book[];
}
