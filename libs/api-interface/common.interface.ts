export interface ApiRes<D> {
  readonly statusCode: number;
  readonly message: string;
  readonly data?: D;
  readonly error?: ApiError;
}

export interface ApiError {
  readonly statusCode: number;
  readonly message: string;
  readonly error?: string;
}
