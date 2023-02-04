import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiEndpoints, ErrorRes, UserRes, UsersRes } from '@libs/api-interface';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { UsersService } from '../service';

@Controller(ApiEndpoints.users)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Res() response: Response<UserRes | ErrorRes>, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.createUser(createUserDto);

      Logger.log(`🚀 UserController: User ${newUser.email} has been created successfully`);

      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        user: newUser,
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
    @Res() response: Response<UserRes | ErrorRes>,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const existingUser = await this.usersService.updateUser(userId, updateUserDto);

      Logger.log(`🚀 UserController: User ${existingUser.email} has been updated successfully`);

      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        user: existingUser,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getUsers(@Res() response: Response<UsersRes | ErrorRes>) {
    try {
      const usersData = await this.usersService.getAllUsers();

      Logger.log(`🚀 UserController: ${usersData.length} users has been got`);

      return response.status(HttpStatus.OK).json({
        message: 'All users data found successfully',
        users: usersData,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getUser(@Res() response: Response<UserRes | ErrorRes>, @Param('id') userId: string) {
    try {
      const existingUser = await this.usersService.getUser(userId);

      Logger.log(`🚀 UserController: User ${existingUser.email} has been got`);

      return response.status(HttpStatus.OK).json({
        message: 'User found successfully',
        user: existingUser,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteUser(@Res() response: Response<UserRes | ErrorRes>, @Param('id') userId: string) {
    try {
      const deletedUser = await this.usersService.deleteUser(userId);

      Logger.log(`🚀 UserController: User ${deletedUser.email} has been deleted`);

      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        user: deletedUser,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }
}
