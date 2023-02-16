export type ApiRes<D> = {
  readonly statusCode: number;
  readonly message: string;
  readonly data?: D;
  readonly error?: any;
}
