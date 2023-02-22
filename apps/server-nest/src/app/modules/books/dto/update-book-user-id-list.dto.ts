import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId } from 'class-validator';
import { BookAction, BookProperty, UpdateBookUserIdList } from '../interface/book.interface';

export class UpdateBookUserIdListDto implements UpdateBookUserIdList {
  @IsEnum(BookAction)
  @ApiProperty({
    enum: BookAction,
    default: BookAction.add,
  })
  readonly action!: BookAction;

  @IsEnum(BookProperty)
  @ApiProperty({
    enum: BookProperty,
    default: BookProperty.inuse,
  })
  readonly property!: BookProperty;

  @IsMongoId()
  @ApiProperty({
    type: String,
    description: 'Should be valid MongoId',
    default: 'Put here user mongoId',
  })
  readonly userId!: string;
}
