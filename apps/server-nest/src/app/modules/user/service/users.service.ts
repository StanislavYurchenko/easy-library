import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@libs/api-interface';
import { CreateUserDto, UpdateUserDto } from '../dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await new this.userModel(createUserDto);

    return newUser.save();
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });

    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return existingUser;
  }

  async getAllUsers(): Promise<User[]> {
    const userData = await this.userModel.find();

    if (!userData || userData.length === 0) {
      throw new NotFoundException('Users data not found!');
    }

    return userData;
  }

  async getUser(userId: string): Promise<User> {
    const existingUser = await this.userModel.findById(userId).exec();

    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return existingUser;
  }

  async deleteUser(userId: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return deletedUser;
  }
}
