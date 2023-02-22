import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { CreateUserDto } from '../../users/dto/create-user-dto';
import { IUser } from '../../users/interface/user.interface';
import { UsersService } from '../../users/service/users.service';
import { JwtPayload, LoginRes } from '../interface/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly authService: UsersService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<IUser | null> {
    const user = await this.usersService.getUserByEmailWithPassword(email);

    if (user?.password && (await compare(pass, user.password))) {
      const { password, ...rest } = user;

      return rest;
    }

    return null;
  }

  async login(user: IUser): Promise<LoginRes> {
    const payload: JwtPayload = { email: user.email, sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }

  async registration(createUserDto: CreateUserDto): Promise<IUser> {
    // eslint-disable-next-line no-param-reassign
    createUserDto.isAdmin = false;

    return this.usersService.createUser(createUserDto);
  }
}
