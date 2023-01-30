import { Document } from 'mongoose';
import {User} from '../../../../../libs/api-interfaces1/user.interface'

export interface IUser extends Document, Omit<User, 'id'> { };
