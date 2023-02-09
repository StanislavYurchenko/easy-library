import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '@libs/api-interface';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { UserDocument } from '../schema';
import { TableName } from '../../../libs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(TableName.User) private readonly userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    let newUser = await new this.userModel(createUserDto).populate({ path: 'inuse_books' });

    newUser = await newUser.populate({ path: 'read_books' });
    newUser = await newUser.populate({ path: 'wish_books' });
    newUser = await newUser.populate({ path: 'reviews' });

    return newUser.save();
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const existingUser = await this.userModel
      .findByIdAndUpdate(userId, updateUserDto, { new: true })
      .populate({ path: 'inuse_books' })
      .populate({ path: 'read_books' })
      .populate({ path: 'wish_books' })
      .populate({ path: 'reviews' });

    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return existingUser;
  }

  async getAllUsers(): Promise<IUser[]> {
    const userData = await this.userModel
      .find()
      .populate({ path: 'inuse_books' })
      .populate({ path: 'read_books' })
      .populate({ path: 'wish_books' })
      .populate({ path: 'reviews' });

    if (!userData || userData.length === 0) {
      throw new NotFoundException('Users data not found!');
    }

    return userData;
  }

  async getUser(userId: string): Promise<IUser> {
    const existingUser = await this.userModel
      .findById(userId)
      .populate({ path: 'inuse_books' })
      .populate({ path: 'read_books' })
      .populate({ path: 'wish_books' })
      .populate({ path: 'reviews' });

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
}
