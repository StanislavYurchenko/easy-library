import { ObjectId } from 'mongoose';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Book } from '@libs/api-interface';

export class CreateBookDto implements Book {
  readonly id!: string;
  readonly _id!: ObjectId;

  @IsString()
  @IsNotEmpty()
  readonly title!: string;

  @IsString()
  @IsNotEmpty()
  readonly author!: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}
