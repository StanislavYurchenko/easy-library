import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TableName } from '../../../libs';
import { ReviewDocument } from '../schema/review.schema';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { ReviewAction, IReview } from '../interface/review.interface';
import { UpdateReviewUserIdListDto } from '../dto/update-review-user-id-list.dto';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(TableName.Review) private readonly reviewModel: Model<ReviewDocument>) {}

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

  async updateReviewUserIdList(
    reviewId: string,
    { action, property, userId }: UpdateReviewUserIdListDto,
  ): Promise<IReview> {
    let review;

    if (action === ReviewAction.add) {
      review = await this.reviewModel.findByIdAndUpdate(
        reviewId,
        { $addToSet: { [`${property}`]: userId } },
        { new: true },
      );
    }

    if (action === ReviewAction.remove) {
      review = await this.reviewModel.findByIdAndUpdate(
        reviewId,
        { $pull: { [`${property}`]: userId } },
        { new: true },
      );
    }

    if (!review) {
      throw new NotFoundException(`Book #${reviewId} not found`);
    }

    return review.toObject();
  }
}
