import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TableName } from '../../../libs';
import { CreateUserDto } from '../dto/create-user-dto';
import { UpdateUserDto } from '../dto/update-user-dto';
import { IUser } from '../interface/user.interface';
import { UserDocument } from '../schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(TableName.User) private readonly userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = await new this.userModel(createUserDto);

    return newUser.save();
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const existingUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });

    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return existingUser;
  }

  async getAllUsers(): Promise<IUser[]> {
    const userData = await this.userModel.find();

    if (!userData || userData.length === 0) {
      throw new NotFoundException('Users data not found!');
    }

    return userData;
  }

  async getUser(userId: string): Promise<IUser> {
    const existingUser = await this.userModel.findById(userId);

    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return existingUser;
  }

  async deleteUser(userId: string): Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return deletedUser;
  }

  async getUserByEmail(email: string): Promise<IUser> {
    const userData = await this.userModel.findOne({ email });

    if (!userData) {
      throw new NotFoundException(`User with email: ${email} not found!`);
    }

    return userData;
  }
}
