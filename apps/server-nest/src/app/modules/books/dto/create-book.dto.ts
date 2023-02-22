import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { IBook } from '../interface/book.interface';

export class CreateBookDto implements Omit<IBook, 'id'> {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 30,
    default: 'Best practices Angular development',
  })
  readonly title!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 30,
    default: 'Mr. Smith',
  })
  readonly author!: string;

  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 1000,
    default: 'The best book about Angular',
  })
  readonly description!: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    required: false,
    default: 100,
  })
  readonly rating!: number;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    required: false,
    default: true,
  })
  readonly available!: boolean;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  @ApiProperty({
    type: [String],
    required: false,
    description: 'Should be valid MongoId array',
    default: [],
  })
  readonly inuse!: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  @ApiProperty({
    type: [String],
    required: false,
    description: 'Should be valid MongoId array',
    default: [],
  })
  readonly read!: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  @ApiProperty({
    type: [String],
    required: false,
    description: 'Should be valid MongoId array',
    default: [],
  })
  readonly wish!: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  @ApiProperty({
    type: [String],
    required: false,
    description: 'Should be valid MongoId array',
    default: [],
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
    default: [],
  })
  readonly dislikes!: string[];

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    required: false,
    default: 1,
  })
  readonly total_quantity!: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    required: false,
    default: 0,
  })
  readonly rented_quantity!: number;
}
