import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { IUser } from '@libs/api-interface';
import { BooksService, ReviewsService } from '@server-nest/modules';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { UserDocument } from '../schema';
import { TableName } from '../../../libs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(TableName.User) private readonly userModel: Model<UserDocument>,
    @Inject(forwardRef(() => BooksService)) private readonly booksService: BooksService,
    @Inject(forwardRef(() => ReviewsService)) private readonly reviewsService: ReviewsService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = await new this.userModel(createUserDto);

    // this.pushRelatedUserData(newUser);

    return newUser.save();
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const existingUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });

    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    // this.pushRelatedUserData(existingUser);

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

  // private pushRelatedUserData(user: IUser): void {
  //   const { inuse_books, read_books, wish_books, reviews, id } = user;

  //   if (inuse_books?.length) {
  //     this.booksService.pushBooksIntoList(inuse_books as any as ObjectId[], 'inuse', id);
  //   }

  //   if (read_books?.length) {
  //     this.booksService.pushBooksIntoList(read_books as any as ObjectId[], 'read', id);
  //   }

  //   if (wish_books?.length) {
  //     this.booksService.pushBooksIntoList(wish_books as any as ObjectId[], 'wish', id);
  //   }
    
  //   if (reviews?.length) {
  //     this.booksService.pushBooksIntoList(wish_books as any as ObjectId[], 'reviews', id);
  //   }
  // }
}
