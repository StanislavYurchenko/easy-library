import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { AccessToken } from '@libs/api-interface';
import { CreateUserDto } from '../../users/dto/create-user-dto';
import { IUser } from '../../users/interface/user.interface';
import { UsersService } from '../../users/service/users.service';
import { JwtPayload } from '../interface/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<IUser | null> {
    try {
      const user = await this.usersService.getUserByEmailWithPassword(email);

      if (user?.password && (await compare(pass, user.password))) {
        const { password, ...rest } = user;

        return rest;
      }

      return null;
    } catch (err: any) {
      throw new UnauthorizedException();
    }
  }

  async login(user: IUser): Promise<AccessToken> {
    const payload: JwtPayload = { email: user.email, sub: user.id };

    return { accessToken: this.jwtService.sign(payload) };
  }

  async registration(createUserDto: CreateUserDto): Promise<IUser> {
    // eslint-disable-next-line no-param-reassign
    createUserDto.isAdmin = false;

    return this.usersService.createUser(createUserDto);
  }
}
