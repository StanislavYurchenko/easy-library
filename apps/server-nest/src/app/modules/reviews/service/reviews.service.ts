import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IReview } from '@libs/api-interface';
import { TableName } from '../../../libs';
import { CreateReviewDto, UpdateReviewDto } from '../dto';
import { ReviewDocument } from '../schema';
import { UsersService, BooksService } from '@server-nest/modules';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(TableName.Review)
    private reviewModel: Model<ReviewDocument>,
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
}
