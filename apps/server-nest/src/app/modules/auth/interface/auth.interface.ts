export interface JwtPayload {
  sub: string;
  email: string;
}

export interface LoginRes {
  access_token: string;
}
