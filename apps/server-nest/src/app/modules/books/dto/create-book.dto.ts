import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { IBook } from '../interface/book.interface';

export class CreateBookDto implements Required<IBook> {
  id!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 30,
  })
  readonly title!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 30,
  })
  readonly author!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(1000)
  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 1000,
  })
  readonly description!: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    required: false,
  })
  readonly rating!: number;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    required: false,
  })
  readonly available!: boolean;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  @ApiProperty({
    type: [String],
    required: false,
    description: 'Should be valid MongoId array',
  })
  readonly inuse!: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  @ApiProperty({
    type: [String],
    required: false,
    description: 'Should be valid MongoId array',
  })
  readonly read!: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  @ApiProperty({
    type: [String],
    required: false,
    description: 'Should be valid MongoId array',
  })
  readonly wish!: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  @ApiProperty({
    type: [String],
    required: false,
    description: 'Should be valid MongoId array',
  })
  readonly likes!: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  @ApiProperty({
    type: [String],
    isArray: true,
    required: false,
    description: 'Should be valid MongoId array',
  })
  readonly dislikes!: string[];

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    required: false,
  })
  readonly total_quantity!: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    required: false,
  })
  readonly rented_quantity!: number;
}
