import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { IBook } from '../interface/book.interface';

export class CreateBookDto implements Required<IBook> {
  id!: string;

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
  readonly inuse!: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly read!: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly wish!: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly likes!: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly dislikes!: string[];

  @IsNumber()
  @IsOptional()
  readonly total_quantity!: number;

  @IsNumber()
  @IsOptional()
  readonly rented_quantity!: number;
}
