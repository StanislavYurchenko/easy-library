import { IUser } from '@libs/api-interface';

export interface RequestWithUser extends Request {
  user: IUser;
}
