import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { IReview } from '../interface/review.interface';

export class CreateReviewDto implements Required<IReview> {
  id!: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly author!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(300)
  @IsNotEmpty()
  readonly comment!: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly book!: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly likes!: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly dislikes!: string[];
}
