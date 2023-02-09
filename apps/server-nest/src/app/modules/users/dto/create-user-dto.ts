import { ObjectId } from 'mongoose';
import {
  IsArray,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IBook, IReview, IUser } from '@libs/api-interface';

export class CreateUserDto implements Required<IUser> {
  id!: ObjectId;

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
  readonly phone!: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly inuse_books!: IBook[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly read_books!: IBook[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly wish_books!: IBook[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly reviews!: IReview[];
}
