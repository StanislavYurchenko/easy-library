import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ForbiddenError } from '@casl/ability';
import { TableName } from '../../../libs';
import { Review, ReviewDocument } from '../schema/review.schema';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { ReviewAction, IReview } from '../interface/review.interface';
import { UpdateReviewUserIdListDto } from '../dto/update-review-user-id-list.dto';
import { IUser } from '../../users/interface/user.interface';
import { AbilityFactory, Actions } from '../../ability';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(TableName.Review) private readonly reviewModel: Model<ReviewDocument>,
    private readonly abilityFactory: AbilityFactory,
  ) {}

  async createReview(createReviewDto: CreateReviewDto): Promise<IReview> {
    const newReview = await new this.reviewModel(createReviewDto).populate({ path: 'author' });

    return newReview.save();
  }

  async updateReview(reviewId: string, updateReviewDto: UpdateReviewDto, currentUser: IUser): Promise<IReview> {
    const ability = this.abilityFactory.defineAbility(currentUser);
    const reviewToUpdate = new Review(await this.getReview(reviewId));

    ForbiddenError.from(ability).setMessage('It is forbidden for you').throwUnlessCan(Actions.Update, reviewToUpdate);

    const existingReview = await this.reviewModel.findByIdAndUpdate(reviewId, updateReviewDto, { new: true });

    if (!existingReview) {
      throw new NotFoundException(`Review #${reviewId} not found`);
    }

    return existingReview.toObject();
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

    return existingReview.toObject();
  }

  async deleteReview(reviewId: string): Promise<IReview> {
    const deletedReview = await this.reviewModel.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      throw new NotFoundException(`Review #${reviewId} not found`);
    }

    return deletedReview.toObject();
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
