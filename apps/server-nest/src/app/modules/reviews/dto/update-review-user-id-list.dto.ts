import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId } from 'class-validator';
import { ReviewAction, ReviewProperty, UpdateReviewUserIdList } from '../interface/review.interface';

export class UpdateReviewUserIdListDto implements UpdateReviewUserIdList {
  @IsEnum(ReviewAction)
  @ApiProperty({
    enum: ReviewAction,
  })
  readonly action!: ReviewAction;

  @IsEnum(ReviewProperty)
  @ApiProperty({
    enum: ReviewProperty,
  })
  readonly property!: ReviewProperty;

  @IsMongoId()
  @ApiProperty({
    type: String,
    description: 'Should be valid MongoId',
  })
  readonly userId!: string;
}
