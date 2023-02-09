import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiEndpoints, ApiRes, IUser } from '@libs/api-interface';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { UsersService } from '../service';

@Controller(ApiEndpoints.users)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Res() response: Response<ApiRes<IUser>>, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.createUser(createUserDto);

      Logger.log(`🚀 UserController: User ${newUser.email} has been created successfully`);

      return response.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.OK,
        message: 'User has been created successfully',
        data: newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: User not created!',
      });
    }
  }

  @Put('/:id')
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getUsers(@Res() response: Response<ApiRes<IUser[]>>) {
    try {
      const usersData = await this.usersService.getAllUsers();

      Logger.log(`🚀 UserController: ${usersData.length} users has been got`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'All users data found successfully',
        data: usersData,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getUser(@Res() response: Response<ApiRes<IUser>>, @Param('id') userId: string) {
    try {
      const existingUser = await this.usersService.getUser(userId);

      Logger.log(`🚀 UserController: User ${existingUser.email} has been got`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'User found successfully',
        data: existingUser,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteUser(@Res() response: Response<ApiRes<IUser>>, @Param('id') userId: string) {
    try {
      const deletedUser = await this.usersService.deleteUser(userId);

      Logger.log(`🚀 UserController: User ${deletedUser.email} has been deleted`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
        data: deletedUser,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }
}
