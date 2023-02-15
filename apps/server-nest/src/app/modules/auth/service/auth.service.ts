import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUser } from '../../users/interface/user.interface';
import { UsersService } from '../../users/service/users.service';
import { JwtPayload } from '../interface/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<IUser | null> {
    const user = await this.usersService.getUserByEmailWithPassword(email);

    if (user?.password && (await bcrypt.compare(pass, user.password))) {
      const { password, ...rest } = user;

      return rest;
    }

    return null;
  }

  async login(user: IUser): Promise<{ access_token: string }> {
    const payload: JwtPayload = { email: user.email, sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }
}
