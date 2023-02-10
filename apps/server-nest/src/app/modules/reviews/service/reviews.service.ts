/* eslint-disable import/no-cycle */
import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IReview } from '@libs/api-interface';
import { TableName } from '../../../libs';
import { ReviewDocument } from '../schema/review.schema';
import { BooksService } from '../../books/service/books.service';
import { UsersService } from '../../users/service/users.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(TableName.Review) private readonly reviewModel: Model<ReviewDocument>,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
    @Inject(forwardRef(() => BooksService)) private readonly booksService: BooksService,
  ) {}

  async createReview(createReviewDto: CreateReviewDto): Promise<IReview> {
    const newReview = await new this.reviewModel(createReviewDto).populate({ path: 'author' });

    return newReview.save();
  }

  async updateReview(reviewId: string, updateReviewDto: UpdateReviewDto): Promise<IReview> {
    const existingReview = await this.reviewModel.findByIdAndUpdate(reviewId, updateReviewDto, { new: true });

    if (!existingReview) {
      throw new NotFoundException(`Review #${reviewId} not found`);
    }

    return existingReview;
  }

  async getAllReviews(): Promise<IReview[]> {
    const reviewData = await this.reviewModel.find();

    if (!reviewData || reviewData.length === 0) {
      throw new NotFoundException('Reviews data not found!');
    }

    return reviewData;
  }

  async getReview(reviewId: string): Promise<IReview> {
    const existingReview = await this.reviewModel.findById(reviewId);

    if (!existingReview) {
      throw new NotFoundException(`Review #${reviewId} not found`);
    }

    return existingReview;
  }

  async deleteReview(reviewId: string): Promise<IReview> {
    const deletedReview = await this.reviewModel.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      throw new NotFoundException(`Review #${reviewId} not found`);
    }

    return deletedReview;
  }

  // async pushReviewsIntoList(id: string[], field: string, value: string) {
  //   const result = await this.reviewModel.updateMany({ _id: { $in: id } }, { $addToSet: { [field]: value } });

  //   if (result.modifiedCount !== id.length) {
  //     throw new BadRequestException(
  //       `Book\'s field ${field}:${value} was not updated for some review(s) from list ${id.toString}`,
  //     );
  //   }
  // }
}
