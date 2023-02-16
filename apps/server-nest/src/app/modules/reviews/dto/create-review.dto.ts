import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { IReview } from '../interface/review.interface';

export class CreateReviewDto implements Required<IReview> {
  id!: string;

  @IsMongoId()
  @ApiProperty({
    type: String,
    description: 'Should be valid MongoId',
  })
  readonly author!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(300)
  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 300,
  })
  readonly comment!: string;

  @IsMongoId()
  @ApiProperty({
    type: String,
    description: 'Should be valid MongoId',
  })
  readonly book!: string;

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
    required: false,
    description: 'Should be valid MongoId array',
  })
  readonly dislikes!: string[];
}
