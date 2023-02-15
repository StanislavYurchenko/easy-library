import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { IUser } from '../interface/user.interface';

export class CreateUserDto implements Required<IUser> {
  id!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 30,
  })
  readonly name!: string;

  @IsEmail()
  @ApiProperty({
    type: String,
    uniqueItems: true,
    description: 'Should be valid and unique email',
  })
  readonly email!: string;

  @MinLength(3)
  @MaxLength(30)
  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 30,
  })
  password!: string;

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    description: 'Should be valid phone number',
  })
  readonly phone!: string;
}
