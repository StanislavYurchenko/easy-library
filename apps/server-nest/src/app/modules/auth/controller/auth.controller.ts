import { Controller, UseGuards, Post, Req, Body, HttpStatus, Logger, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiEndpoints, ApiRes, AuthEndpoints } from '@libs/api-interface';
import { LoginDto } from '../dto/login-dto';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { LoginRes } from '../interface/auth.interface';
import { AuthService } from '../service/auth.service';
import { IUser, RequestWithUser } from '../../users';
import { CreateUserDto } from '../../users/dto/create-user-dto';

@Controller(ApiEndpoints.auth)
@ApiTags(ApiEndpoints.auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post(AuthEndpoints.login)
  async login(@Req() req: RequestWithUser): Promise<LoginRes> {
    return this.authService.login(req.user);
  }

  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'User has been registered successfully' })
  @ApiBadRequestResponse({ description: 'Error: User not registered!' })
  @Post(AuthEndpoints.registration)
  async registration(@Res() response: Response<ApiRes<IUser>>, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.authService.registration(createUserDto);

      Logger.log(`🚀 AuthController: User ${newUser.email} has been registered successfully`);

      return response.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'User has been created successfully',
        data: newUser,
      });
    } catch (err: any) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: User not created!',
      });
    }
  }
}
