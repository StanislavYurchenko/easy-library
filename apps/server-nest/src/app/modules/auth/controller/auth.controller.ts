import { Controller, UseGuards, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiEndpoints, AuthEndpoints } from '@libs/api-interface';
import { LoginDto } from '../dto/login-dto';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { LoginRes } from '../interface/auth.interface';
import { AuthService } from '../service/auth.service';
import { RequestWithUser } from '../../users';

@Controller(ApiEndpoints.auth)
@ApiTags(ApiEndpoints.auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AuthEndpoints.login)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  async login(@Req() req: RequestWithUser): Promise<LoginRes> {
    return this.authService.login(req.user);
  }
}
