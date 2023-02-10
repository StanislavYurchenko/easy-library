import { Controller, Get, Post, Body, Param, Delete, Res, Logger, HttpStatus, Put } from '@nestjs/common';
import { Response } from 'express';
import { ApiEndpoints, ApiRes, IReview } from '@libs/api-interface';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { ReviewsService } from '../service/reviews.service';

@Controller(ApiEndpoints.reviews)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async createReview(@Res() response: Response<ApiRes<IReview>>, @Body() createReviewDto: CreateReviewDto) {
    try {
      const newReview = await this.reviewsService.createReview(createReviewDto);

      Logger.log(`🚀 ReviewController: Review ${newReview.id} has been created successfully`);

      return response.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Review has been created successfully',
        data: newReview as any as IReview,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: Review not created!',
        ...err.response,
      });
    }
  }

  @Put('/:id')
  async updateReview(
    @Res() response: Response<ApiRes<IReview>>,
    @Param('id') reviewId: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    try {
      const existingReview = await this.reviewsService.updateReview(reviewId, updateReviewDto);

      Logger.log(`🚀 ReviewsController: Review ${existingReview.id} has been updated successfully`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Review has been successfully updated',
        data: existingReview as any as IReview,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getReviews(@Res() response: Response<ApiRes<IReview[]>>) {
    try {
      const reviewsData = await this.reviewsService.getAllReviews();

      Logger.log(`🚀 ReviewController: ${reviewsData.length} reviews has been got`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'All reviews data found successfully',
        data: reviewsData as any as IReview[],
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getReview(@Res() response: Response<ApiRes<IReview>>, @Param('id') reviewId: string) {
    try {
      const existingReview = await this.reviewsService.getReview(reviewId);

      Logger.log(`🚀 ReviewController: Review ${existingReview.id} has been got`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Review found successfully',
        data: existingReview as any as IReview,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteReview(@Res() response: Response<ApiRes<IReview>>, @Param('id') reviewId: string) {
    try {
      const deletedReview = await this.reviewsService.deleteReview(reviewId);

      Logger.log(`🚀 ReviewController: Review ${deletedReview.id} has been deleted`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Review deleted successfully',
        data: deletedReview as any as IReview,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }
}
