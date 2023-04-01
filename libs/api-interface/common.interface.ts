export type ApiRes<D> = {
  readonly statusCode: number;
  readonly message: string;
  readonly data?: D;
}

export type ApiErrRes = {
  readonly statusCode: number;
  readonly message: string;
  readonly timestamp: string;
  readonly path: string;
};
export interface AccessToken {
  accessToken: string;
}
