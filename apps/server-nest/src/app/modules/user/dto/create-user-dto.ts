import { ObjectId } from 'mongoose';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '@libs/api-interface';

  
export class CreateUserDto implements User {
  readonly id!: string;
  readonly _id!: ObjectId;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  readonly name!: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email!: string;

  @IsPhoneNumber()
  @IsOptional()
  readonly phone?: string;
}
