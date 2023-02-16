import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
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
}
