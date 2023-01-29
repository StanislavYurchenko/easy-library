import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';
  
  export class CreateUserDto {
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @IsNotEmpty()
    readonly name!: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email!: string;

    @IsPhoneNumber()
    @IsOptional()
    readonly phone?: string;
  }
