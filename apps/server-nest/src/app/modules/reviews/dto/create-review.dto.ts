import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ObjectId } from 'mongoose';
import { IBook, IReview, IUser } from '@libs/api-interface';

export class CreateReviewDto implements Required<IReview> {
  id!: ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  readonly author!: IUser;

  @IsString()
  @MinLength(3)
  @MaxLength(300)
  @IsNotEmpty()
  readonly comment!: string;

  @IsMongoId()
  @IsOptional()
  readonly book!: IBook;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly likes!: IUser[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly dislikes!: IUser[];
}
