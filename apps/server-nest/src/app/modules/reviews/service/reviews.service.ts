import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IReview } from '@libs/api-interface';
import { TableName } from '../../../libs';
import { CreateReviewDto, UpdateReviewDto } from '../dto';
import { ReviewDocument } from '../schema';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(TableName.Review) private reviewModel: Model<ReviewDocument>) {}

  async createReview(createReviewDto: CreateReviewDto): Promise<IReview> {
    let newReview = await new this.reviewModel(createReviewDto).populate({ path: 'author' });

    newReview = await newReview.populate({ path: 'book' });
    newReview = await newReview.populate({ path: 'likes' });
    newReview = await newReview.populate({ path: 'dislikes' });

    return newReview.save();
  }

  async updateReview(reviewId: string, updateReviewDto: UpdateReviewDto): Promise<IReview> {
    const existingReview = await this.reviewModel
      .findByIdAndUpdate(reviewId, updateReviewDto, { new: true })
      .populate({ path: 'author' })
      .populate({ path: 'book' })
      .populate({ path: 'likes' })
      .populate({ path: 'dislikes' });

    if (!existingReview) {
      throw new NotFoundException(`Review #${reviewId} not found`);
    }

    return existingReview;
  }

  async getAllReviews(): Promise<IReview[]> {
    const reviewData = await this.reviewModel
      .find()
      .populate({ path: 'author' })
      .populate({ path: 'book' })
      .populate({ path: 'likes' })
      .populate({ path: 'dislikes' });

    if (!reviewData || reviewData.length === 0) {
      throw new NotFoundException('Reviews data not found!');
    }

    return reviewData;
  }

  async getReview(reviewId: string): Promise<IReview> {
    const existingReview = await this.reviewModel
      .findById(reviewId)
      .populate({ path: 'author' })
      .populate({ path: 'book' })
      .populate({ path: 'likes' })
      .populate({ path: 'dislikes' });

    if (!existingReview) {
      throw new NotFoundException(`Review #${reviewId} not found`);
    }

    return existingReview;
  }

  async deleteReview(reviewId: string): Promise<IReview> {
    const deletedReview = await this.reviewModel
      .findByIdAndDelete(reviewId)
      .populate({ path: 'author' })
      .populate({ path: 'book' })
      .populate({ path: 'likes' })
      .populate({ path: 'dislikes' });

    if (!deletedReview) {
      throw new NotFoundException(`Review #${reviewId} not found`);
    }

    return deletedReview;
  }
}
