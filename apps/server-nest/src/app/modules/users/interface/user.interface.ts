export interface IUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly password?: string;
  readonly phone?: string;
}

export interface RequestWithUser extends Request {
  user: IUser;
}
