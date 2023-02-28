import { Controller, UseGuards, Post, Req, Body, HttpStatus, Logger, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AccessToken, ApiEndpoints, ApiRes, AuthEndpoints } from '@libs/api-interface';
import { LoginDto } from '../dto/login-dto';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../service/auth.service';
import { IUser, RequestWithUser } from '../../users';
import { CreateUserDto } from '../../users/dto/create-user-dto';

@ApiTags(ApiEndpoints.auth)
@Controller(ApiEndpoints.auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @Post(AuthEndpoints.login)
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: RequestWithUser, @Res() response: Response<ApiRes<AccessToken>>) {
    Logger.log(`🚀 AuthController: User ${req.user.email} has been login successfully`);

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'User has been login successfully',
      data: await this.authService.login(req.user),
    });
  }

  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'User has been registered successfully' })
  @ApiBadRequestResponse({ description: 'Error: User not registered!' })
  @Post(AuthEndpoints.registration)
  async registration(@Res() response: Response<ApiRes<IUser>>, @Body() createUserDto: CreateUserDto) {
    const newUser = await this.authService.registration(createUserDto);

    Logger.log(`🚀 AuthController: User ${newUser.email} has been registered successfully`);

    return response.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'User has been created successfully',
      data: newUser,
    });
  }
}
