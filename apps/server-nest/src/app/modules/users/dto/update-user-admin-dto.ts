import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { IUser } from '../interface/user.interface';

export class CreateUserDto implements Pick<IUser, 'isAdmin'> {
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    required: true,
    default: true,
  })
  readonly isAdmin!: boolean;
}
