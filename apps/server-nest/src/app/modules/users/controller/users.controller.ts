import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiEndpoints, ApiRes, UserEndpoints } from '@libs/api-interface';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user-dto';
import { UpdateUserDto } from '../dto/update-user-dto';
import { IUser, RequestWithUser } from '../interface/user.interface';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@Controller(ApiEndpoints.users)
@ApiTags(ApiEndpoints.users)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(UserEndpoints.profile)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Profile found successfully' })
  @ApiNotFoundResponse({ description: 'Profile not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getProfile(@Req() { user }: RequestWithUser, @Res() response: Response<ApiRes<IUser>>) {
    try {
      if (!user) {
        throw new NotFoundException('Profile not found');
      }

      Logger.log(`🚀 UserController: Profile ${user.email} has been got`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Profile found successfully',
        data: user,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'User has been created successfully' })
  @ApiBadRequestResponse({ description: 'Error: User not created!' })
  async createUser(@Res() response: Response<ApiRes<IUser>>, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.createUser(createUserDto);

      Logger.log(`🚀 UserController: User ${newUser.email} has been created successfully`);

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

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ description: 'User has been successfully updated' })
  @ApiNotFoundResponse({ description: 'User #<id> not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async updateUser(
    @Res() response: Response<ApiRes<IUser>>,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const existingUser = await this.usersService.updateUser(userId, updateUserDto);

      Logger.log(`🚀 UserController: User ${existingUser.email} has been updated successfully`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'User has been successfully updated',
        data: existingUser,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'All users data found successfully' })
  @ApiNotFoundResponse({ description: 'Users data not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getUsers(@Res() response: Response<ApiRes<IUser[]>>) {
    try {
      const usersData = await this.usersService.getAllUsers();

      Logger.log(`🚀 UserController: ${usersData.length} users has been got`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'All users data found successfully',
        data: usersData,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User found successfully' })
  @ApiNotFoundResponse({ description: 'User #<id> not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getUser(@Res() response: Response<ApiRes<IUser>>, @Param('id') userId: string) {
    try {
      const existingUser = await this.usersService.getUser(userId);

      Logger.log(`🚀 UserController: User ${existingUser.email} has been got`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'User found successfully',
        data: existingUser,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User deleted successfully' })
  @ApiNotFoundResponse({ description: 'User #<id> not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async deleteUser(@Res() response: Response<ApiRes<IUser>>, @Param('id') userId: string) {
    try {
      const deletedUser = await this.usersService.deleteUser(userId);

      Logger.log(`🚀 UserController: User ${deletedUser.email} has been deleted`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
        data: deletedUser,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }
}
