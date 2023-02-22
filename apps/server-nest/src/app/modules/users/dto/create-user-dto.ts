import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { IUser } from '../interface/user.interface';

export class CreateUserDto implements Omit<IUser, 'id'> {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 30,
    default: 'super',
  })
  readonly name!: string;

  @IsEmail()
  @ApiProperty({
    type: String,
    uniqueItems: true,
    description: 'Should be valid and unique email',
    default: 'super@mail.com',
  })
  readonly email!: string;

  @MinLength(3)
  @MaxLength(30)
  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 30,
    default: '12345678',
  })
  password!: string;

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    description: 'Should be valid phone number',
    default: '+380951234567',
  })
  readonly phone!: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Should be valid phone number',
    default: false,
  })
  isAdmin!: boolean;
}
