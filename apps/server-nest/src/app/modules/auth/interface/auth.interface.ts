import { IUser } from '../../users';

export interface JwtPayload {
  sub: string;
  email: string;
}

export interface RequestWithUser extends Request {
  user: IUser;
}
