import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { IUser } from '../interface/user.interface';

export class CreateUserDto implements Required<IUser> {
  id!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  readonly name!: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email!: string;

  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  password!: string;

  @IsPhoneNumber()
  @IsOptional()
  readonly phone!: string;
}
