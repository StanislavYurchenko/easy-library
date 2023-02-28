import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { ForbiddenError } from '@casl/ability';
import { TableName } from '../../../libs';
import { CreateUserDto } from '../dto/create-user-dto';
import { UpdateUserDto } from '../dto/update-user-dto';
import { IUser } from '../interface/user.interface';
import { User, UserDocument } from '../schema/user.schema';
import { AbilityFactory, Actions } from '../../ability';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(TableName.User) private readonly userModel: Model<UserDocument>,
    private readonly abilityFactory: AbilityFactory,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const hashedPassword = await this.hashPassword(createUserDto.password);

    // eslint-disable-next-line no-param-reassign
    createUserDto.password = hashedPassword;

    const newUser = await new this.userModel(createUserDto).save();

    const { password, ...user } = newUser.toObject();

    return user;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto, currentUser: IUser): Promise<IUser> {
    const ability = this.abilityFactory.defineAbility(currentUser);
    const userToUpdate = new User(await this.getUser(userId));

    ForbiddenError.from(ability).throwUnlessCan(Actions.Update, userToUpdate);

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

    return existingUser.toObject();
  }

  async deleteUser(userId: string): Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return deletedUser.toObject();
  }

  async getUserByEmail(email: string): Promise<IUser> {
    const userData = await this.userModel.findOne({ email });

    if (!userData) {
      throw new NotFoundException(`User with email: ${email} not found!`);
    }

    return userData.toObject();
  }

  async getUserByEmailWithPassword(email: string): Promise<IUser> {
    const userData = await this.userModel.findOne({ email }).select('+password');

    if (!userData) {
      throw new NotFoundException(`User with email: ${email} not found!`);
    }

    return userData.toObject();
  }

  private async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }
}
