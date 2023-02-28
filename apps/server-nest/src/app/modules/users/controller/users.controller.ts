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
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { ForbiddenError } from '@casl/ability';
import { ApiEndpoints, ApiRes, UserEndpoints } from '@libs/api-interface';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user-dto';
import { UpdateUserDto } from '../dto/update-user-dto';
import { IUser, RequestWithUser } from '../interface/user.interface';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import {
  CheckAbilities,
  deleteUserAbility,
  AbilitiesGuard,
  readUserAbility,
  updateUserAbility,
  createUserAbility,
} from '../../ability';

@ApiBearerAuth()
@ApiTags(ApiEndpoints.users)
@UseGuards(JwtAuthGuard)
@Controller(ApiEndpoints.users)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ description: 'Profile found successfully' })
  @ApiNotFoundResponse({ description: 'Profile not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get(UserEndpoints.profile)
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

  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'User has been created successfully' })
  @ApiBadRequestResponse({ description: 'Error: User not created!' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(createUserAbility)
  @Post()
  async createUser(@Res() response: Response<ApiRes<IUser>>, @Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(createUserDto);

    Logger.log(`🚀 UserController: User ${newUser.email} has been created successfully`);

    return response.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'User has been created successfully',
      data: newUser,
    });
  }

  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ description: 'User has been successfully updated' })
  @ApiNotFoundResponse({ description: 'User #<id> not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(updateUserAbility)
  @Put('/:id')
  async updateUser(
    @Req() request: any,
    @Res() response: Response<ApiRes<IUser>>,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const existingUser = await this.usersService.updateUser(userId, updateUserDto, request.user);

    Logger.log(`🚀 UserController: User ${existingUser.email} has been updated successfully`);

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'User has been successfully updated',
      data: existingUser,
    });
  }

  @ApiOkResponse({ description: 'All users data found successfully' })
  @ApiNotFoundResponse({ description: 'Users data not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(readUserAbility)
  @Get()
  async getUsers(@Res() response: Response<ApiRes<IUser[]>>) {
    const usersData = await this.usersService.getAllUsers();

    Logger.log(`🚀 UserController: ${usersData.length} users has been got`);

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'All users data found successfully',
      data: usersData,
    });
  }

  @ApiOkResponse({ description: 'User found successfully' })
  @ApiNotFoundResponse({ description: 'User #<id> not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(readUserAbility)
  @Get('/:id')
  async getUser(@Res() response: Response<ApiRes<IUser>>, @Param('id') userId: string) {
    const existingUser = await this.usersService.getUser(userId);

    Logger.log(`🚀 UserController: User ${existingUser.email} has been got`);

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'User found successfully',
      data: existingUser,
    });
  }

  @ApiOkResponse({ description: 'User deleted successfully' })
  @ApiNotFoundResponse({ description: 'User #<id> not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(deleteUserAbility)
  @Delete('/:id')
  async deleteUser(@Res() response: Response<ApiRes<IUser>>, @Param('id') userId: string) {
    const deletedUser = await this.usersService.deleteUser(userId);

    Logger.log(`🚀 UserController: User ${deletedUser.email} has been deleted`);

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
      data: deletedUser,
    });
  }
}
