import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ObjectId } from 'mongoose';
import { IBook, IReview, IUser } from '@libs/api-interface';

export class CreateBookDto implements Required<IBook> {
  id!: ObjectId;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  readonly title!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  readonly author!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(1000)
  @IsNotEmpty()
  readonly description!: string;

  @IsNumber()
  @IsOptional()
  readonly rating!: number;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly available!: boolean;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly reviews!: IReview[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly inuse!: IUser[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly read!: IUser[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly wish!: IUser[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly likes!: IUser[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly dislikes!: IUser[];

  @IsNumber()
  @IsOptional()
  readonly total_quantity!: number;

  @IsNumber()
  @IsOptional()
  readonly rented_quantity!: number;
}
