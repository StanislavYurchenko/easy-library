import { Document } from 'mongoose';
import { User } from '@libs/api-interface';

export interface IUser extends Document<string, unknown, User>, Omit<User, 'id'> {}
